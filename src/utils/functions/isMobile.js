const isMobile = () =>
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile Safari|Opera Mini/i.test(navigator.userAgent) ||
	window.innerWidth < 400;

export default isMobile;
