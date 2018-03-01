require('shelljs/global');
const fs = require('fs');
const TEMPLATE_CONFIG_FILE = './config.json';
const RELATIVE_PATH = '../';
const MODULE_DIR = `${RELATIVE_PATH}src/module/`;
const COMPONENT_DIR = `${RELATIVE_PATH}src/components/`;
const TEMPLATE = `${RELATIVE_PATH}src/template/`;
const TEMPLATE_MODULE_FILE_PATH = `${TEMPLATE}module/`;
const TEMPLATE_COMPONENT_FILE_PATH = `${TEMPLATE}component/`;
const config = require(TEMPLATE_CONFIG_FILE);
writeFile(TEMPLATE_CONFIG_FILE, `{
  "modules": [
    {
      "page-title": "例子",
      "url-path": "/changeden"
    },
    {
      "page-title": "模板例子",
      "url-path": "/changeden/template"
    }
  ],
  "components": [
    {
      "import-path": "/changeden"
    },
    {
      "import-path": "/changeden/chan"
    }
  ]
}
`);
genModules(config.modules || []);
genComponents(config.components || []);

/**
 * functions
 * */
function genModules(modules) {
  modules.forEach(module => {
    if (module) {
      console.log(module);
      let urlPath = module['url-path'] || '/index';
      let urlPathSubLastIndex = urlPath.lastIndexOf('.');
      if (urlPathSubLastIndex >= 0) {
        urlPath = urlPath.substr(0, urlPathSubLastIndex);
      }
      let pageTitle = module['page-title'] || '模板标题';
      let pathArray = urlPath.split('/').filter(item => {
        return !!item;
      });
      let fullPath = MODULE_DIR + pathArray.join('/');
      let fileName = pathArray[pathArray.length - 1];
      console.log(fullPath, urlPath, pathArray, fileName);
      console.log(`start to gen module ${urlPath}`);
      mkdir('-p', fullPath);
      let parentPath = getParentPath(pathArray);
      let outputFilePath = `${fullPath}/${fileName}.`;
      writeTemplateForList([
        // {
        //   'input': `${TEMPLATE_MODULE_FILE_PATH}index.html`,
        //   'output': `${outputFilePath}html`,
        //   'regs': {
        //     'PageTitle': pageTitle
        //   }
        // },
        {
          'input': `${TEMPLATE_MODULE_FILE_PATH}index.js`,
          'output': `${outputFilePath}js`,
          'regs': {
            '../../main': `${parentPath}main`
          }
        },
        {
          'input': `${TEMPLATE_MODULE_FILE_PATH}module.scss`,
          'output': `${fullPath}/module.scss`,
          'regs': {
            '../../assets/scss/base': `${parentPath}assets/scss/base`
          }
        },
        {
          'input': `${TEMPLATE_MODULE_FILE_PATH}module.vue`,
          'output': `${fullPath}/module.vue`,
          'regs': {
            '<section>': `<section class="main-layout ${pathArray.join('-')}-layout">`
          }
        },
        {
          'input': `${TEMPLATE_MODULE_FILE_PATH}module.js`,
          'output': `${fullPath}/module.js`,
          'regs': {
            '../../lib/BaseModule': `${parentPath}lib/BaseModule`
          }
        },
        {
          'input': `${TEMPLATE_MODULE_FILE_PATH}config.json`,
          'output': `${fullPath}/config.json`,
          'regs': {
            'moduleEntry': `${fileName}.js`,
            'redirectUrl': `${urlPath}`,
            'pageTitle': `${pageTitle}`
          }
        }
      ]);
    }
  });
}

function genComponents(components) {
  components.forEach(component => {
    if (component) {
      let importPath = component['import-path'];
      let pathArray = importPath.split('/').filter(item => {
        return !!item;
      });
      let fullPath = COMPONENT_DIR + pathArray.join('/');
      console.log(`start to gen component ${importPath}`);
      mkdir('-p', fullPath);
      let parentPath = getParentPath(pathArray);
      let outputFilePath = `${fullPath}/component.`;
      writeTemplateForList([
        {
          'input': `${TEMPLATE_COMPONENT_FILE_PATH}index.js`,
          'output': `${fullPath}/index.js`
        },
        {
          'input': `${TEMPLATE_COMPONENT_FILE_PATH}component.js`,
          'output': `${outputFilePath}js`,
          'regs': {
            '../../lib/BaseModule': `${parentPath}lib/BaseModule`
          }
        },
        {
          'input': `${TEMPLATE_COMPONENT_FILE_PATH}component.scss`,
          'output': `${outputFilePath}scss`,
          'regs': {
            '../../assets/scss/base': `${parentPath}assets/scss/base`
          }
        },
        {
          'input': `${TEMPLATE_COMPONENT_FILE_PATH}component.vue`,
          'output': `${outputFilePath}vue`,
          'regs': {
            '<section>': `<section class="component-layout ${pathArray.join('-')}-layout">`
          }
        }
      ]);
    }
  });
}

function getParentPath(pathArray) {
  let mainPathParentCount = pathArray.length + 1;
  let parentPath = '';
  for (let i = 0; i < mainPathParentCount; i++) {
    parentPath += '../';
  }
  return parentPath;
}

function readFile(file, cb) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      cb && cb(data);
    }
  });
}

function writeFile(file, data, cb) {
  fs.writeFile(file, data, 'utf8', function (err) {
    if (err) {
      console.error(err);
    } else {
      cb && cb();
    }
  });
}

function writeTemplate(readFileFullPath, writeFileFullPath, replaceObj) {
  return new Promise(resolve => {
    readFile(readFileFullPath, (data) => {
      if (replaceObj) {
        Object.keys(replaceObj).forEach(key => {
          let reg = new RegExp(key);
          data = data.replace(reg, replaceObj[key]);
        });
      }
      writeFile(writeFileFullPath, data, resolve);
    });
  });
}

function writeTemplateForList(list) {
  (list || []).forEach(item => {
    let input = item.input;
    let output = item.output;
    let regs = item.regs;
    writeTemplate(input, output, regs).then(() => {
      console.log(`${output} has gen.`);
    });
  });
}
