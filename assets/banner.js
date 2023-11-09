function initBannerFunc() {
  const videos = document.querySelectorAll(".js-custom-banner-video");

  videos.length && videos.forEach((video) => {
    video.pause();

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      video.play();
    }, {threshold: 0.5});

    observer.observe(video);
  });

}

initBannerFunc();
