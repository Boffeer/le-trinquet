function setupLazyYT($) {
  $.videoParents.forEach((review, index) => {
    let ytId = review.getAttribute("data-yt-id");
    if (!ytId) return;

    // let ytThumbUrl = `https://i.ytimg.com/vi/${ytId}/hq720.jpg`;
    let ytThumbUrl = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    let ytThumbWebpUrl = `https://i.ytimg.com/vi_webp/${ytId}/hqdefault.webp`;
    let ytVideoUrl = `https://www.youtube.com/embed/${ytId}/?autoplay=1`;
    // let ytVideoUrl = `https://www.youtube.com/watch?v=${ytId}`;

    let pic = review.querySelector($.videoPicClassName);
    let thumb = review.querySelector($.videoImgClassName);
    let video = review.querySelector($.videoIframeClassName);
    let play = review.querySelector($.playButtonClassName);

    let thumbWebp = document.createElement("source");
    thumbWebp.srcset = ytThumbWebpUrl;
    thumbWebp.type = "image/webp";
    pic.appendChild(thumbWebp);
    pic.appendChild(thumb);

    video.setAttribute("data-src", ytVideoUrl);
    thumb.src = ytThumbUrl;

    let videoClass = `js_video--${index}`;
    let playClass = `js_play--${index}`;

    // let videoFirstClass = video.classList[0];
    // video.classList.remove(videoFirstClass)

    video.classList.add(videoClass);
    // video.classList.add(videoFirstClass)
    play.classList.add(playClass);

    play.addEventListener("click", function () {
      video.src = video.getAttribute("data-src");
      pic.style.display = "none";
      video.style.display = "block";
      this.remove();
    });
  });
}
window.addEventListener("DOMContentLoaded", (event) => {
  const testimonialsYT = {
    videoParents: document.querySelectorAll(".reviews-slider__slide"),
    videoPicClassName: ".reviews-slider__pic",
    videoImgClassName: ".reviews-slider__img",
    videoIframeClassName: ".reviews-slider__video",
    playButtonClassName: ".reviews-slider__button",
  };
  setupLazyYT(testimonialsYT);
});
