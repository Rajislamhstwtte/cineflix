import { LiveChannel } from '../types';

export const liveTVChannels: LiveChannel[] = [
  // North America
  {
    id: 'nbc-news-now',
    name: 'NBC News NOW',
    logo: 'https://i.imgur.com/8zYv8pP.png',
    url: 'https://nbcnewsnow-i.akamaihd.net/hls/live/724548/NBCNewsNow/master.m3u8',
    category: 'News',
    provider: 'NBC News'
  },
  {
    id: 'cbs-news',
    name: 'CBS News',
    logo: 'https://i.imgur.com/qL0x5u0.png',
    url: 'https://cbsn-us.cbsnstream.cbsnews.com/out/v1/55a8648e8f134e82a470f83d51c92944/master.m3u8',
    category: 'News',
    provider: 'CBS News'
  },
  {
    id: 'nasa-tv',
    name: 'NASA TV',
    logo: 'https://i.imgur.com/sI64R8v.png',
    url: 'https://nasa-i.akamaihd.net/hls/live/253565/NASA-NTV1-Public/master.m3u8',
    category: 'Documentary',
    provider: 'NASA'
  },
  {
    id: 'pluto-movies',
    name: 'Pluto TV Movies',
    logo: 'https://i.imgur.com/v0mP4T3.png',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/hls/channel/5d5f00e8b78a487556b6a086/master.m3u8',
    category: 'Movies',
    provider: 'Pluto TV'
  },
  {
    id: 'filmrise-free-movies',
    name: 'FilmRise Free Movies',
    logo: 'https://i.imgur.com/T23QJ4k.png',
    url: 'https://dai.google.com/linear/hls/event/sid_33066_40200_020921/master.m3u8',
    category: 'Movies',
    provider: 'FilmRise'
  },
  {
    id: 'xumo-free-movies',
    name: 'Xumo Free Movies',
    logo: 'https://i.imgur.com/4hxj25V.png',
    url: 'https://d35n3mxgu532b4.cloudfront.net/v1/master/9a150824e4d65126848ota/XUMO-Movies/playlist.m3u8',
    category: 'Movies',
    provider: 'Xumo'
  },
  {
    id: 'pga-tour',
    name: 'PGA Tour',
    logo: 'https://i.imgur.com/s6d2x5A.png',
    url: 'https://rakuten-pgatour-1-us.samsung.wurl.com/playlist.m3u8',
    category: 'Sports',
    provider: 'PGA Tour'
  },
  
  // Europe
  {
    id: 'sky-news',
    name: 'Sky News',
    logo: 'https://i.imgur.com/3h8a3iO.png',
    url: 'https://linear-424-lses.samsung.wurl.com/playlist.m3u8',
    category: 'News',
    provider: 'Sky News'
  },
  {
    id: 'france-24-en',
    name: 'France 24 English',
    logo: 'https://i.imgur.com/aKOzI2N.png',
    url: 'https://f24-hls-live-en.gcdn.co/out/v1/181f5ea6414441e5a7b63994a5327318/index.m3u8',
    category: 'News',
    provider: 'France 24'
  },
  {
    id: 'dw-english',
    name: 'DW English',
    logo: 'https://i.imgur.com/s6GD8b7.png',
    url: 'https://dwstream6.akamaized.net/hls/live/2015525/dwstream6/index.m3u8',
    category: 'News',
    provider: 'Deutsche Welle'
  },
  {
    id: 'euronews-english',
    name: 'Euronews English',
    logo: 'https://i.imgur.com/2p19pYO.png',
    url: 'https://euronews-euronews-world-1-au.samsung.wurl.com/manifest/playlist.m3u8',
    category: 'News',
    provider: 'Euronews'
  },

  // Asia
  {
    id: 'nhk-world-japan',
    name: 'NHK World Japan',
    logo: 'https://i.imgur.com/n14T3pH.png',
    url: 'https://nhkworld.webcdn.stream.ne.jp/www11/nhkworld-live-s/live.m3u8',
    category: 'News',
    provider: 'NHK'
  },
  {
    id: 'arirang-tv',
    name: 'Arirang TV',
    logo: 'https://i.imgur.com/I22fHjO.png',
    url: 'https://arirang-gcloud-live.akamaized.net/hls/live/2023307/arirang/arirang-gcloud-live.m3u8',
    category: 'International',
    provider: 'Arirang'
  },
  {
    id: 'cgtn',
    name: 'CGTN',
    logo: 'https://i.imgur.com/CQU2M3n.png',
    url: 'https://news.cgtn.com/resource/live/english/cgtn-news.m3u8',
    category: 'News',
    provider: 'CGTN'
  },
  {
    id: 'dd-india',
    name: 'DD India',
    logo: 'https://i.imgur.com/8NLEd7E.png',
    url: 'https://dd-india.akamaized.net/hls/live/2022422/ddindia/master.m3u8',
    category: 'News',
    provider: 'Doordarshan'
  },
  {
    id: 'ndtv-india',
    name: 'NDTV India 24x7',
    logo: 'https://i.imgur.com/zy5L12M.png',
    url: 'https://ndtv24x7elem.akamaized.net/hls/live/2003478/ndtv24x7/master.m3u8',
    category: 'India',
    provider: 'NDTV'
  },
  {
    id: 'shemaroo-bollywood',
    name: 'Shemaroo Bollywood',
    logo: 'https://i.imgur.com/H1ZUIzC.png',
    url: 'https://shemaroo-silo.amagi.tv/playlist.m3u8',
    category: 'India',
    provider: 'Shemaroo'
  },
  {
    id: 'somoy-tv',
    name: 'Somoy TV',
    logo: 'https://i.imgur.com/g82yMsl.png',
    url: 'https://cdn.appnet.com.bd/s1/somoytv.m3u8',
    category: 'International',
    provider: 'Somoy TV'
  },

  // Middle East
  {
    id: 'al-jazeera-english',
    name: 'Al Jazeera English',
    logo: 'https://i.imgur.com/1NTT2pm.png',
    url: 'https://live-hls-web-aje.getaj.net/AJE/01.m3u8',
    category: 'News',
    provider: 'Al Jazeera'
  },

  // South America
  {
    id: 'tv-brasil',
    name: 'TV Brasil',
    logo: 'https://i.imgur.com/5zaUb2F.png',
    url: 'https://d22p0pgvj0Ljbz.cloudfront.net/v1/master/6f423377759a224c619cf789114f331904a0e104/TVBrasil/main.m3u8',
    category: 'International',
    provider: 'TV Brasil'
  },
  
  // Africa
  {
    id: 'sabc-news',
    name: 'SABC News',
    logo: 'https://i.imgur.com/P1pA4w6.png',
    url: 'https://bclea-sabc-live.akamaized.net/sabc-news/index.m3u8',
    category: 'News',
    provider: 'SABC'
  },
  
  // Entertainment & Music
  {
    id: 'fail-army',
    name: 'Fail Army',
    logo: 'https://i.imgur.com/J4i0J5p.png',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/hls/channel/5c929e746f3a351cf5395992/master.m3u8',
    category: 'Comedy',
    provider: 'Pluto TV'
  },
  {
    id: 'qello-concerts',
    name: 'Qello Concerts',
    logo: 'https://i.imgur.com/i9a4sY6.png',
    url: 'https://stingray-qello-1-us.samsung.wurl.com/playlist.m3u8',
    category: 'Music',
    provider: 'Stingray'
  },
  {
    id: 'red-bull-tv',
    name: 'Red Bull TV',
    logo: 'https://i.imgur.com/PibgPT3.png',
    url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8',
    category: 'Entertainment',
    provider: 'Red Bull'
  },

  // Kids
  {
    id: 'pluto-kids-tv',
    name: 'Pluto Kids TV',
    logo: 'https://i.imgur.com/v0mP4T3.png',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/hls/channel/5d5f02c2b78a487556b6a090/master.m3u8',
    category: 'Kids',
    provider: 'Pluto TV'
  },
  {
    id: 'filmrise-kids',
    name: 'FilmRise Kids',
    logo: 'https://i.imgur.com/T23QJ4k.png',
    url: 'https://dai.google.com/linear/hls/event/sid_33069_40200_020921/master.m3u8',
    category: 'Kids',
    provider: 'FilmRise'
  }
];
