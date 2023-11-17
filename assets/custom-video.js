function customVideoFuncInit() {
  const selectors = {
    playBtn: ".js-custom-video-play-btn",
    video: ".js-custom-video",
    iframeVideo: ".js-custom-video-iframe",
    modal: ".js-custom-video-modal",
    iframePoster: ".js-custom-video-iframe-poster"
  };

  const classes = {
    hiddenPlayBtn: "custom-video__play-btn--hidden",
    customHidden: "custom-video__modal--hidden",
    hidden: "hidden"
  };

  const playBtn = document.querySelector(selectors.playBtn);
  const video = document.querySelector(selectors.video);
  const modal = document.querySelector(selectors.modal);
  const iframe = document.querySelector(selectors.iframeVideo);
  const iframePoster = document.querySelector(selectors.iframePoster);

  const videoHandler = (play) => {
    if (video) {
      if (play) {
        video.play();
        video.controls = true;
      } else {
        video.pause();
        video.load();
        video.controls = false;
      }
    } else if (iframe) {
      const isYoutube = iframe.src.includes("youtube");
      iframe.src += (isYoutube ? "?mute=1" : "?muted=1") + `&autoplay=${+play}`;
    }
  };

  const onPopupClose = () => {
    videoHandler(false);

    playBtn?.classList.remove(classes.hiddenPlayBtn);
    modal?.classList.add(classes.customHidden);
    iframePoster?.classList.remove(classes.hidden);
    document.getElementsByTagName("body")[0].style.overflow = "visible";
  };

  const onPlayClick = () => {
    const isPopup = modal.dataset.videoPositionType === "popup";

    videoHandler(true);

    playBtn.classList.add(classes.hiddenPlayBtn);
    iframePoster?.classList.add(classes.hidden);

    if (isPopup) {
      modal?.classList.remove(classes.customHidden);

      modal?.addEventListener("click", (e) => {
        modal === e.target && onPopupClose();
      });

      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
  };

  playBtn?.addEventListener("click", onPlayClick);
}

customVideoFuncInit();
