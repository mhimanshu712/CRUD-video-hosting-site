var likeButton = document.querySelector('#likeButton');
var likeButtonIcon = document.querySelector('#likeButtonIcon');
var shareButton = document.querySelector('#shareButton');

likeButton.addEventListener('click',function(){
    likeButtonIcon.classList.toggle('red');
});

shareButton.addEventListener('click',function(){
    const copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = "fuck";
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      };
})
