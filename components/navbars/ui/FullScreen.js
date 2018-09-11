const onFullScreen = (event) => {
    event.preventDefault();

    const element = document.documentElement;

    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

const FullScreen = () => (
    <li className="nav-item d-none d-lg-block full-screen-link">
        <a className="nav-link"
            onClick={onFullScreen}>
            <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
        </a>
    </li>
);

export default FullScreen;