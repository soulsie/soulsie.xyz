//************************************** */

// JavaScript utilities for soulsie.xyz
// The code is ugly ik. Please don't mention it
// Made by: SOULS#3009

//************************************** */

// href scrolling style
    scrollToElement = function(e, style, duration) {
        var y, cy, dy, start, easing, offset, f;
            if (!e) y = 0;
            else {
              offset = (e.dataset.scrollOffset ? parseInt(e.dataset.scrollOffset) : 0) * parseFloat(getComputedStyle(document.documentElement).fontSize);
              switch (e.dataset.scrollBehavior ? e.dataset.scrollBehavior : 'default') {
                case 'default':
                default:
                  y = e.offsetTop + offset;
                  break;
                case 'center':
                  if (e.offsetHeight < window.innerHeight) y = e.offsetTop - ((window.innerHeight - e.offsetHeight) / 2) + offset;
                  else y = e.offsetTop - offset;
                  break;
                case 'previous':
                  if (e.previousElementSibling) y = e.previousElementSibling.offsetTop + e.previousElementSibling.offsetHeight + offset;
                  else y = e.offsetTop + offset;
                  break;
              }
            }
            if (!style) style = 'smooth';
            if (!duration) duration = 750;
            if (style == 'instant') {
              window.scrollTo(0, y);
              return;
            }
            start = Date.now();
            cy = window.scrollY;
            dy = y - cy;
            switch (style) {
              case 'linear':
                easing = function(t) {
                  return t
                };
                break;
              case 'smooth':
                easing = function(t) {
                  return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                };
                break;
            }
            f = function() {
              var t = Date.now() - start;
              if (t >= duration) window.scroll(0, y);
              else {
                window.scroll(0, cy + (dy * easing(t / duration)));
                requestAnimationFrame(f);
              }
            };
            f();
          }
          var initialSection, initialScrollPoint, initialId, header, footer, name, hideHeader, hideFooter, disableAutoScroll, h, e, ee, k, locked = false,
            scrollPointParent = function(target) {
              while (target) {
                if (target.parentElement && target.parentElement.tagName == 'SECTION') break;
                target = target.parentElement;
              }
              return target;
            },
            scrollPointSpeed = function(scrollPoint) {
              let x = parseInt(scrollPoint.dataset.scrollSpeed);
              switch (x) {
                case 5:
                  return 250;
                case 4:
                  return 500;
                case 3:
                  return 750;
                case 2:
                  return 1000;
                case 1:
                  return 1250;
                default:
                  break;
              }
              return 750;
            }
        // Background video utilities
        function videoBackground(id, settings) {
          var _this = this;
          this.id = id;
          this.src = settings.src;
          this.poster = settings.poster;
          this.position = settings.position;
          this.loop = settings.loop;
          this.$target = $(settings.target);
          this.$video = null;
          this.init();
        };
        videoBackground.prototype.autoplay = function() {
          if (client.os != 'ios' && client.os != 'android' && client.os != 'undefined') return true;
          switch (client.os) {
            case 'ios':
              if (client.osVersion >= 10 && (client.browser == 'safari' || client.browser == 'chrome')) return true;
              break;
            case 'android':
              if ((client.browser == 'chrome' && client.browserVersion >= 54) || (client.browser == 'firefox' && client.browserVersion >= 49)) return true;
              break;
            default:
              break;
          }
          return false;
        };
        videoBackground.prototype.init = function() {
          if (this.autoplay()) {
            this.$video = document.createElement('video');
            this.$video.src = this.src;
            this.$video.poster = this.poster;
            this.$video.autoplay = true;
            this.$video.muted = true;
            this.$video.preload = 'auto';
            this.$video.loop = this.loop;
            this.$video.playsInline = true;
            this.$video.disablePictureInPicture = true;
            this.$video.disableRemotePlayback = true;
            this.$video.setAttribute('webkit-playsinline', '');
            this.$video.setAttribute('muted', '');
            this.$target.appendChild(this.$video);
            this.$video.play();
          } else this.$target.style.backgroundImage = 'url(\'' + this.poster + '\')';
        };
        (function() {
          var $bg = document.createElement('div');
          $bg.id = 'bg';
          $body.insertBefore($bg, $body.firstChild);
          new videoBackground('bg', {
            target: '#bg',
            src: 'assets/videos/bg.mp4',
            poster: 'assets/videos/bg.mp4.jpg',
            position: 'center',
            loop: true
          });
        })();