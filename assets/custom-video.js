function customVideoFuncInit() {
  const selectors = {
    playBtn: ".js-custom-video-play-btn",
    video: ".js-custom-video",
    iframeVideo: ".js-custom-video-iframe",
    videoWrapper: ".js-custom-video-wrapper",
    modal: ".js-custom-video-modal",
    iframePoster: ".js-custom-video-iframe-poster"
  };

  const classes = {
    hiddenPlayBtn: "custom-video__play-btn--hidden",
    customHidden: "custom-video__hidden",
    hidden: "hidden"
  };

  const playBtn = document.querySelector(selectors.playBtn);
  const videos = document.querySelectorAll(selectors.video);
  const modal = document.querySelector(selectors.modal);
  const videoWrapper = document.querySelector(selectors.videoWrapper);
  const iframes = document.querySelectorAll(selectors.iframeVideo);
  const iframePosters = document.querySelectorAll(selectors.iframePoster);

  const onPopupClose = () => {
    videoWrapper.classList.remove(classes.customHidden);
    modal.classList.add(classes.customHidden);
    document.getElementsByTagName("body")[0].style.overflow = "visible";
  };

  const onPlayClick = () => {
    const isPopup = videoWrapper.dataset.videoPositionType === "popup";

    iframePosters.length && iframePosters.forEach((poster) => {
      poster.classList.add(classes.hidden);
    });

    iframes.length && iframes.forEach((video) => {
      const isYoutube = video.src.includes("youtube");
      video.src += (isYoutube ? "?mute=1" : "?muted=1") + "&autoplay=1";
    });

    videos.length && videos.forEach(video => video.play());
    playBtn.classList.add(classes.hiddenPlayBtn);

    if (isPopup) {
      videoWrapper.classList.add(classes.customHidden);
      modal.classList.remove(classes.customHidden);

      modal && modal.addEventListener("click", (e) => {
        e.target.dataset.target === "modal" && onPopupClose();
      });

      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
  };

  playBtn && playBtn.addEventListener("click", onPlayClick);
}

customVideoFuncInit();
