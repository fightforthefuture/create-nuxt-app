// Global Helpers
//
// Usage in a Vue component:
// import { createMetaTags, myOtherHelperFunction } from '~/assets/js/helpers'

/* eslint-disable no-redeclare */

import axios from 'axios'

// Add meta tags per page for Twitter and Facebook share cards
export function createMetaTags(tags={}) {
  const meta = {}

  tags = Object.assign({
    'author': 'Fight for the Future',
    'og:description': tags.description,
    'og:image': tags.image,
    'og:site_name': '<%= siteTitle %>',
    'og:title': tags.title,
    'og:type': 'website',
    'og:url': tags.url,
    'twitter:card': 'summary_large_image',
    'twitter:description': tags.description,
    'twitter:image': tags.image,
    'twitter:site': '@FightForTheFtr',
    'twitter:title': tags.title,
    'twitter:url': tags.url
  }, tags)

  const fakeTagNames = ['title', 'image', 'url']

  for (let key of Object.keys(tags)) {
    if (key.match(/^og\:/)) { // eslint-disable-line no-useless-escape
      meta[key] = {
        hid: key,
        property: key,
        content: tags[key]
      }
    }
    else if (!fakeTagNames.includes(key)) {
      meta[key] = {
        hid: key,
        name: key,
        content: tags[key]
      }
    }
  }

  return Object.values(meta)
}

// POST form data to a url
export function postFormData(url, data={}) {
  const axios = require('axios')
  const qs = require('qs')

  return axios.post(url, qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// POST form data to Mothership
export function sendToMothership(data={}, submission={}) {
  return postFormData('https://queue.fftf.xyz/action', data)
}

// Wrap text with two new lines in paragraph tags
export function simpleFormat(text) {
  return text.split('\n\n').map(l => `<p>${l}</p>`).join('')
}

// Open a pop-up window (mostly for sharing actions)
export function openPopup(url, title='popup', w=600, h=500) {
  // Fixes dual-screen position
  let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
  let dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

  let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  let left = ((width / 2) - (w / 2)) + dualScreenLeft;
  let top = ((height / 2) - (h / 2)) + dualScreenTop;
  let newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
export function smoothScrollTo(endX, endY, duration) {
  let startX = window.scrollX || window.pageXOffset,
    startY = window.scrollY || window.pageYOffset,
    distanceX = endX - startX,
    distanceY = endY - startY,
    startTime = new Date().getTime()

  duration = typeof duration !== 'undefined' ? duration : 400

  // Easing function
  let easeInOutQuart = function(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from
  }

  let timer = window.setInterval(function() {
    let time = new Date().getTime() - startTime,
      newX = easeInOutQuart(time, startX, distanceX, duration),
      newY = easeInOutQuart(time, startY, distanceY, duration)
    if (time >= duration) {
      window.clearInterval(timer)
    }
    window.scrollTo(newX, newY)
  }, 1000 / 60) // 60 fps
}

// Smooth scroll animation to an element by ID
export function smoothScrollToElement(el, duration) {
  duration = typeof duration !== 'undefined' ? duration : 500;
  el = typeof el === 'string' ? document.querySelector(el) : el;

  if (el) {
    smoothScrollTo(el.offsetLeft, el.offsetTop, duration)
  }
}

// Smooth step scroll within an element
export function smoothScrollWithinElement(el, endY, duration) {
  let el = el,
      startY = el.scrollTop,
      change = endY - startY,
      currentTime = 0,
      increment = 20,
      duration = typeof duration !== 'undefined' ? duration : 400,

  easeInOutQuad = function (time, start, change, duration) {
    time /= duration/2;
    if (time < 1) return change/2*time*time + start
    time--
    return -change/2 * (time*(time-2) - 1) + start
  },

  smoothStepScroll = function() {
    currentTime += increment
    let val = easeInOutQuad(currentTime, startY, change, duration)
    el.scrollTop = val
    if(currentTime < duration) {
      setTimeout(smoothStepScroll, increment)
    }
  }
  smoothStepScroll()
}

// Pre-select US State based on IP
export async function geocodeState() {
  const state = {
    name: null,
    abbr: null
  }

  try {
    const response = await axios.get('https://geocode-ip.fftf.xyz')
    const geo = response.data

    if (
      geo.country.iso_code === 'US' &&
      geo.subdivisions &&
      geo.subdivisions[0] &&
      geo.subdivisions[0].names &&
      geo.subdivisions[0].names.en
    ) {
      state.name = geo.subdivisions[0].names.en
      state.abbr = geo.subdivisions[0].iso_code
    }
  }
  catch (err) {
    console.error(err) // eslint-disable-line no-console
  }

  return state
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
export function getMobileOperatingSystem() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

export function isMobileOS() {
  return getMobileOperatingSystem() !== 'unknown'
}

