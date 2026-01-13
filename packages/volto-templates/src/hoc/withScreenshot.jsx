import {useScreenshot} from 'use-react-screenshot'

const withScreenshot = (Component) => {
    return (props) => {
        const [image, takeScreenShot] = useScreenshot({
            type: 'image/jpeg',
            quality: 1.0,
        });

        return <Component image={image} takeScreenshot={takeScreenShot} {...props} />;
    };
};

export default withScreenshot;