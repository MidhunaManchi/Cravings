import React,{Component} from 'react';
import './App.css';
var FeedApp = React.createClass({

  // get ready an empty array for tweet data
  getInitialState: function () {
    return {
      tweets: []
    }
  },

  // an utility function to parse tweet's hashtag and link
  ify: function (tweet)  {
    var newtweet = tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
      return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
    });
    newtweet = newtweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
      return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
    });
    newtweet = newtweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
      var http = m2.match(/w/) ? 'http://' : '';
      return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
    });

    return {__html: newtweet};
  },

  // an utility function to display time
  timeAgo: function(dateString) {
    var rightNow = new Date();
    var then = new Date(dateString);
    var ua = window.navigator.userAgent;

    // IE can't parse these crazy Ruby dates
    if (ua.indexOf("MSIE ")) then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));

    var diff = rightNow - then;
    var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;

    if (isNaN(diff) || diff < 0) return ""; // return blank string if unknown
    if (diff < second * 2) return "right now";
    if (diff < minute) return Math.floor(diff / second) + " seconds ago";
    if (diff < minute * 2) return "about 1 minute ago";
    if (diff < hour) return Math.floor(diff / minute) + " minutes ago";
    if (diff < hour * 2) return "about 1 hour ago";
    if (diff < day) return  Math.floor(diff / hour) + " hours ago";
    if (diff > day && diff < day * 2) return "yesterday";
    if (diff < day * 365) return Math.floor(diff / day) + " days ago";
    else return "over a year ago";
  },

  // get data ready before rendering
  componentWillMount: function () {
    var t = this;

    // establish ajax call
    axios.get('tweets.php', {
      params: {
        screen_name: this.props.screen_name,
        count: this.props.count
      }
    })
    .then(function (result) {

      // set state with retrieved tweet data
      t.setState({
        tweets: result.data
      });
    });
  },

  render: function () {

    var th = this;

    return (
      <div>
        {this.state.tweets.map(function(tweet) {
          return (
            <div key={tweet.id} className="tweet">
              <div dangerouslySetInnerHTML={th.ify(tweet.text)} />
              <div className="time">{th.timeAgo(tweet.created_at)}</div>
            </div>
          )
        })}
      </div>
    )
  }
});

ReactDOM.render(<FeedApp screen_name="quenesswebblog" count="10"/>, document.getElementById('react-feed'))
