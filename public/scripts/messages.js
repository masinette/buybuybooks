const loadMessages = function() {
  $.ajax({
    url: 'http://localhost:8080/messages',
    method: 'GET'
  }).done((result) => {
    console.log("MESSAGES",result);
    // renderTweets(result);
    console.log('ajax callback called');
  }).fail(err => {
    console.log('ajax error caught');
    console.log(err);
  });
};

//create a tweet element from data returned from user input
const createTweetElement = function(tweetObj) {
  const $tweet = $(`<article class = "tweet">

      <header>

      <div class = "userNameWrap">
        <div class = "userIcon">
          <div><img src = "${tweetObj.user.avatars}"></i></div>
        </div>

        <div>
          <p>${escape(tweetObj.user.name)}</p>
        </div>
      </div>

        <div>
          <p class = "handle">${escape(tweetObj.user.handle)}</p>
        </div>

      </header>

        <p>${escape(tweetObj.content.text)}</p>
      <footer>
        <div>
        <p>${days(tweetObj.created_at)}</p>
       </div>
        <div class = "socialLinks">
          <div class = "hidden">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </footer>

      </article>`);

  return $tweet;
};






$(document).ready(function () {

  //send AJAX POST request to send form data to the server
  const url = '/tweets';
  $.ajax({
    url,
    method: 'POST',
    data: tweetEntry
  }).done(() => {
    $(this).children("textarea").val("");
    ($(this).children('div').children('.counter').val(140));
    loadTweets();
    console.log('ajax callback called');
  }).fail(err => {
    console.log('ajax error caught');
    console.log(err);
  });
});
