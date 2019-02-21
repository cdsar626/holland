//slideshow made by @cdsar626

let slideshow_picture_active = 0;
let picUrls = {};

function slideshow(target, urls) {
  picUrls[target] = urls;
  let div = document.getElementsByClassName(target);
  if (div.length) {
    div = div[0];
    div.className = div.className + ' slideshow-box';
    let finalHtml = `
    <div class="slideshow-picture">
      <div class="slideshow-left" onclick="prevbg('${target}')"></div>
      <img class="mainPicture${target}" src="${urls[0]}">
      <div class="slideshow-right" onclick="nextbg('${target}')"></div>
    </div>`;
    finalHtml += `<div class="slideshow-thumbs">`;
    for (let i = 0; i < urls.length; i++) {
      finalHtml += `<div class="slideshow-thumbs-picture ${i == 0 ? 'slideshow-active':''}" style="
      background-image: url(${urls[i]});
      background-position: center;"
      onclick="changebg(this, '${target}', ${i})"></div>`;
    }
    finalHtml += '</div>';
    div.innerHTML = finalHtml;
  }
}

function changebg(ev, trgt, active) {
  let old = document.getElementsByClassName('slideshow-active')[0];
  let oldClasses = old.className.split(' slideshow-active');
  old.className = oldClasses[0]+oldClasses[1];
  ev.className += ' slideshow-active';
  let pic = document.getElementsByClassName('mainPicture'+trgt)[0];
  pic.src = ev.style.backgroundImage.split('"')[1];
  slideshow_picture_active = active;
}

function nextbg(trgt) {
  let old = document.getElementsByClassName('slideshow-active')[0];
  let oldClasses = old.className.split(' slideshow-active');
  old.className = oldClasses[0]+oldClasses[1];
  let pic = document.getElementsByClassName('mainPicture'+trgt)[0];
  slideshow_picture_active = (slideshow_picture_active + 1)% picUrls[trgt].length;
  pic.src = picUrls[trgt][slideshow_picture_active];
  let next = document.getElementsByClassName('slideshow-thumbs-picture')[slideshow_picture_active];
  next.className += ' slideshow-active';
}

function prevbg(trgt) {
  let old = document.getElementsByClassName('slideshow-active')[0];
  let oldClasses = old.className.split(' slideshow-active');
  old.className = oldClasses[0]+oldClasses[1];
  let pic = document.getElementsByClassName('mainPicture'+trgt)[0];
  slideshow_picture_active = (slideshow_picture_active == 0 ? picUrls[trgt].length : slideshow_picture_active) - 1;
  pic.src = picUrls[trgt][slideshow_picture_active];
  let next = document.getElementsByClassName('slideshow-thumbs-picture')[slideshow_picture_active];
  next.className += ' slideshow-active';
}