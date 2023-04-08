

function Container(props) {
    const { screen, component, classes } = props;
    const Component = component || 'div';

    return <Component className={`${classes} my-[50px] max-w-${screen || "md"} px-4 mx-auto`} {...props} />
}
export default Container;