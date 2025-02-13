import BaseForm from 'uniforms/BaseForm'

const Custom = parent => class extends parent {
    static Unstyled = Custom;

    static displayName = `Custom${parent.displayName}`;
}

export default Custom(BaseForm)