import Vue from 'vue';
import CodeBlock from '../components/CodeBlock';

function importAll(resolve) {
    return resolve
        .keys()
        .forEach(fileName => {
            const config = resolve(fileName);
            const componentName = fileName.replace('./', '').replace('.vue', '');

            Vue.component(componentName, config.default || config);
        })
}

const components = require.context('@/components/ComponentExamples', false, /\.vue$/)
const styles = require.context('@/components/StyleExamples', false, /\.vue$/)

importAll(components);
importAll(styles);

Vue.component('code-block', CodeBlock);