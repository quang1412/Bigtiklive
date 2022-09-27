function getRandomNum(min = 1, max = 100) {
  return parseInt(Math.random() * (max - min) + min);
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export function defaultSettings(cid = 0) {
  return ({
    "widget_alertbox_follow_imageurl": "https://isetup.vn/tiktok/assets/gif/jumpy-t-rex.gif",
    "widget_alertbox_share_active": true,
    "widget_likeranking_titleColor": "#ffffff",
    "widget_alertbox_like_layout": "banner",
    "basic_coinpercomment": 1,
    "basic_coinper100likeenabled": true,
    "widget_alertbox_like_fontsize": 40,
    "widget_alertbox_follow_texthighlightcolor": "#32c3a6",
    "widget_alertbox_follow_alertduration": 10,
    "widget_likeranking_title": "Top tha tim",
    "widget_alertbox_gift_textanimation": "wave",
    "widget_likeranking_textColor": "#fffafa",
    "widget_alertbox_follow_alertanimationout": "backOutDown",
    "widget_alertbox_general_censortimeout": 0,
    "widget_alertbox_like_alertduration": 10,
    "widget_alertbox_like_soundvolume": 50,
    "basic_coinper100like": 100,
    "widget_alertbox_general_censorrecentevents": true,
    "widget_likeranking_autoResetEnabled": false,
    "widget_alertbox_gift_fontweight": 800,
    "widget_alertbox_general_parryalertdelay": 3,
    "widget_alertbox_share_imageurl": "https://isetup.vn/tiktok/assets/gif/jumpy-t-rex.gif",
    "widget_alertbox_like_messagetemplate": "",
    "widget_wof_giftCount": 1,
    "widget_alertbox_share_layout": "banner",
    "widget_alertbox_share_soundvolume": 100,
    "widget_alertbox_like_active": true,
    "widget_alertbox_gift_messagetemplate": null,
    "widget_alertbox_general_backgroundcolor": "#80ffac",
    "basic_tiktokid": "norinpham_m4",
    "widget_alertbox_like_soundurl": "https://isetup.vn/tiktok/assets/sound/new-message-4.ogg",
    "basic_coinperdiamond": 1,
    "widget_alertbox_gift_alertminamount": 3,
    "widget_wof_unfollower": true,
    "widget_alertbox_general_alertparries": false,
    "widget_alertbox_gift_texthighlightcolor": "#32c3a6",
    "basic_followerbonus": 10,
    "widget_alertbox_like_textcolor": "#ffffff",
    "basic_coinperdiamondenabled": true,
    "widget_alertbox_follow_alerttextdelay": 0,
    "widget_alertbox_share_texthighlightcolor": "#32c3a6",
    "basic_levelcoin": 2,
    "widget_alertbox_share_textanimation": "wiggle",
    "widget_alertbox_share_messagetemplate": "",
    "widget_alertbox_like_texthighlightcolor": "#ff4242",
    "widget_alertbox_general_alertdelay": 3,
    "widget_alertbox_gift_fontsize": 40,
    "widget_alertbox_follow_alertanimationin": "backInDown",
    "widget_alertbox_share_alertanimationin": "backInDown",
    "widget_likeranking_barColor": "#3d3d3d",
    "widget_alertbox_follow_active": true,
    "widget_alertbox_follow_messagetemplate": " ",
    "widget_wof_commentKey": "a",
    "widget_alertbox_share_alertanimationout": "backOutDown",
    "widget_alertbox_gift_imageurl": "https://isetup.vn/tiktok/assets/gif/jumpy-t-rex.gif",
    "widget_alertbox_share_alerttextdelay": 0,
    "widget_alertbox_like_fontweight": 800,
    "uid": cid,
    "widget_alertbox_follow_soundvolume": 50,
    "widget_likeranking_bgOpacity": 0,
    "widget_likeranking_barBgColor": "#e7a6e2",
    "widget_alertbox_gift_alertanimationout": "rotateOut",
    "widget_alertbox_general_layout": "banner",
    "widget_wof_friend": true,
    "widget_alertbox_like_imageurl": "https://isetup.vn/tiktok/assets/gif/Explosion.gif",
    "widget_alertbox_like_alertanimationin": "rotateIn",
    "basic_coinpercommentenabled": true,
    "widget_alertbox_share_fontsize": 40,
    "widget_alertbox_gift_soundvolume": 79,
    "widget_alertbox_share_soundurl": "https://isetup.vn/tiktok/assets/sound/new-message-4.ogg",
    "widget_alertbox_gift_textcolor": "#ffffff",
    "widget_alertbox_follow_fontweight": 800,
    "widget_alertbox_follow_textcolor": "#ffffff",
    "widget_wof_maxPlayer": 10,
    "widget_alertbox_share_fontweight": 800,
    "widget_wof_giftName": "rose",
    "widget_alertbox_follow_layout": "banner",
    "widget_likeranking_bgImageEnabled": true,
    "basic_updateidat": (new Date().getTime() / 1000) - 3600,
    "widget_alertbox_gift_alerttextdelay": 0,
    "widget_alertbox_gift_soundurl": "https://isetup.vn/tiktok/assets/sound/new-message-4.ogg",
    "widget_alertbox_share_alertduration": 10,
    "widget_alertbox_follow_soundurl": "https://isetup.vn/tiktok/assets/sound/new-message-4.ogg",
    "basic_coinpershare": 1,
    "basic_levelmultiplier": 1.3,
    "widget_alertbox_general_approvedmanually": false,
    "widget_wof_joinEvent": "chat",
    "widget_alertbox_gift_alert_text_delay": 16,
    "widget_likeranking_resetAfterMinute": 1,
    "widget_alertbox_gift_layout": "side",
    "widget_likeranking_bgImageUrl": "https://ahotechshop.com/wp-content/uploads/2021/06/vle0yur.jpg",
    "basic_coinpershareenabled": true,
    "widget_alertbox_follow_textanimation": "wiggle",
    "widget_wof_follower": true,
    "widget_alertbox_like_alerttextdelay": 0,
    "widget_alertbox_like_alertanimationout": "rotateOut",
    "widget_alertbox_like_textanimation": "wiggle",
    "widget_alertbox_follow_fontsize": 40,
    "widget_alertbox_gift_active": true,
    "widget_alertbox_share_textcolor": "#ffffff",
    "basic_nameofcoin": "Xu",
    "widget_alertbox_gift_alertanimationin": "rotateIn",
    "widget_alertbox_gift_alertduration": 7
  })
};

export function fakeLikeEvent() {
  return ({
    test: true,
    likeCount: getRandomNum(),
    totalLikeCount: getRandomNum(1000, 9999),
    userId: "6554647110284197889",
    secUid: "MS4wLjABAAAAU4XQLH0KzwLjw19fYkShq1FgT5lVzcDArVLsuSWfuVvg96hAysIODICbWKdV-hgP",
    uniqueId: "Tester",
    nickname: "Tester",
    profilePictureUrl: "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4a04621f095d6a6b16b30bdc722602a~c5_100x100.webp?x-expires=1662228000&x-signature=4AKU4iqmJBx9J1IG%2Bh6iVHMSEWM%3D",
    followRole: 0,
    userBadges: [],
    userDetails: {
      createTime: "0",
      bioDescription: "",
      profilePictureUrls: [
        "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4a04621f095d6a6b16b30bdc722602a~tplv-tiktok-shrink:72:72.webp?x-expires=1662228000&x-signature=pXDUl0FzKYK2U7vaNpNh10GPtso%3D",
        "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4a04621f095d6a6b16b30bdc722602a~c5_100x100.webp?x-expires=1662228000&x-signature=4AKU4iqmJBx9J1IG%2Bh6iVHMSEWM%3D",
        "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4a04621f095d6a6b16b30bdc722602a~c5_100x100.jpeg?x-expires=1662228000&x-signature=hsja78THkzYLZFm2SkZ0Xv%2BdyQQ%3D"
      ]
    },
    followInfo: {
      followingCount: getRandomNum(100, 500),
      followerCount: getRandomNum(10, 100),
      followStatus: getRandomNum(0, 2),
      pushStatus: 0
    },
    isModerator: false,
    isNewGifter: false,
    isSubscriber: false,
    topGifterRank: null,
    msgId: "7138484059457604379",
    createTime: "1662057842353",
    displayType: "pm_mt_msg_viewer",
    label: "{0:user} liked the LIVE",
    name: "like",
    id: makeid(10)
  })
}