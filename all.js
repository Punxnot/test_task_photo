var serverData =
[{"age":27,
"cityName":"Санкт-Петербург",
"cryptedId":"1",
"gender":"w",
"name":"Sugar_free",
"photos":[ {"size128":"https://i03.fotocdn.net/s10/179/gallery_xs/381/2467658930.jpg?20160113195847", "size48":"https://i03.fotocdn.net/s10/179/gallery_t/381/2467658930.jpg?20160113195847", "sizeBox":"https://i03.fotocdn.net/s10/179/gallery_m/381/2467658930.jpg?20160113195847"}, {"size128":"https://i03.fotocdn.net/s10/176/gallery_xs/381/2467658927.jpg?20160113195903", "size48":"https://i03.fotocdn.net/s10/176/gallery_t/381/2467658927.jpg?20160113195903", "sizeBox":"https://i03.fotocdn.net/s10/176/gallery_m/381/2467658927.jpg?20160113195903"}, {"size128":"https://i03.fotocdn.net/s10/175/gallery_xs/381/2467658926.jpg?20151226141615", "size48":"https://i03.fotocdn.net/s10/175/gallery_t/381/2467658926.jpg?20151226141615", "sizeBox":"https://i03.fotocdn.net/s10/175/gallery_m/381/2467658926.jpg?20151226141615"}, {"size128":"https://i03.fotocdn.net/s10/173/gallery_xs/381/2467658924.jpg?20151214085342", "size48":"https://i03.fotocdn.net/s10/173/gallery_t/381/2467658924.jpg?20151214085342", "sizeBox":"https://i03.fotocdn.net/s10/173/gallery_m/381/2467658924.jpg?20151214085342"} ]},
{"age":33,
"cityName":"Лондон",
"cryptedId":"2",
"gender":"w",
"name":"Ann",
"photos":[ {"size128":"https://i03.fotocdn.net/s10/172/gallery_xs/381/2467658923.jpg?20151214085323", "size48":"https://i03.fotocdn.net/s10/172/gallery_t/381/2467658923.jpg?20151214085323", "sizeBox":"https://i03.fotocdn.net/s10/172/gallery_m/381/2467658923.jpg?20151214085323"}, {"size128":"https://i03.fotocdn.net/s10/171/gallery_xs/381/2467658922.jpg?20151226141703", "size48":"https://i03.fotocdn.net/s10/171/gallery_t/381/2467658922.jpg?20151226141703", "sizeBox":"https://i03.fotocdn.net/s10/171/gallery_m/381/2467658922.jpg?20151226141703"}, {"size128":"https://i02.fotocdn.net/s10/170/gallery_xs/381/2467658921.jpg?20151214085331", "size48":"https://i02.fotocdn.net/s10/170/gallery_t/381/2467658921.jpg?20151214085331", "sizeBox":"https://i02.fotocdn.net/s10/170/gallery_m/381/2467658921.jpg?20151214085331"} ]}];

(function() {
  var agree, buttonClicks, buttonDismiss, data, disagree, dismiss, gender, getData, mainImageContainer, nameContainer, otherInfo, setImages, setInfo, setMainImage, setThumbnails, statistics, thumbsContainer;

  getData = function() {
    return serverData.pop();
  };

  data = getData();

  setImages = function() {
    setThumbnails();
    return setMainImage(0);
  };

  setThumbnails = function() {
    var item, itemId, j, len, ref, results, thumb, thumbUrl;
    thumbsContainer.innerHTML = "";
    ref = data["photos"];
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
      thumbUrl = item["size48"];
      itemId = data["photos"].indexOf(item);
      thumb = document.createElement("img");
      thumb.setAttribute("src", thumbUrl);
      thumb.classList.add("thumbnail");
      results.push(thumbsContainer.appendChild(thumb));
    }
    return results;
  };

  setMainImage = function(ind) {
    var mainImageUrl;
    mainImageUrl = data["photos"][ind]["sizeBox"];
    return mainImageContainer.style.backgroundImage = "url(" + mainImageUrl + ")";
  };

  setInfo = function() {
    var age, city, info, name;
    name = data["name"];
    age = data["age"];
    city = data["cityName"];
    info = age + ", " + city;
    nameContainer.innerHTML = name;
    otherInfo.innerHTML = info;
    if (data["gender"] === "w") {
      return gender.innerHTML = "ней";
    } else {
      return gender.innerHTML = "ним";
    }
  };

  thumbsContainer = document.getElementById("thumbsContainer");

  mainImageContainer = document.getElementById("mainImageContainer");

  nameContainer = document.getElementById("name");

  otherInfo = document.getElementById("other");

  statistics = document.getElementById("statistics");

  gender = document.getElementById("gender");

  dismiss = 0;

  agree = 0;

  disagree = 0;

  buttonClicks = 0;

  setImages();

  setInfo();

  window.ready = (function() {
    window.prepare = function() {
      var allThumbs, allThumbsList;
      allThumbs = thumbsContainer.querySelectorAll('.thumbnail');
      allThumbsList = Array.prototype.slice.call(allThumbs, 0);
      document.querySelector(".thumbnail").classList.add("active");
      return [].forEach.call(allThumbs, function(i) {
        return i.addEventListener("click", function() {
          var ind, previous;
          previous = document.querySelector(".active");
          previous.classList.remove("active");
          this.classList.add("active");
          mainImageContainer.innerHTML = "";
          ind = allThumbsList.indexOf(this);
          return setMainImage(ind);
        });
      });
    };
    return prepare();
  })();

  buttonDismiss = document.getElementById("dismiss");

  document.addEventListener("click", function(e) {
    var allThumbs, allThumbsList;
    if (e.target.id === "dismiss" || e.target.id === "disagree" || e.target.id === "agree") {
      if (serverData.length !== 0) {
        buttonClicks += 1;
        switch (e.target.id) {
          case "dismiss":
            dismiss += 1;
            break;
          case "disagree":
            disagree += 1;
            break;
          case "agree":
            agree += 1;
        }
        data = getData();
        setImages();
        setInfo();
        allThumbs = thumbsContainer.querySelectorAll('.thumbnail');
        allThumbsList = Array.prototype.slice.call(allThumbs, 0);
        document.querySelector(".thumbnail").classList.add("active");
        [].forEach.call(allThumbs, function(i) {
          return i.addEventListener("click", function() {
            var ind, previous;
            previous = document.querySelector(".active");
            previous.classList.remove("active");
            this.classList.add("active");
            mainImageContainer.innerHTML = "";
            ind = allThumbsList.indexOf(this);
            return setMainImage(ind);
          });
        });
        if (buttonClicks >= 5) {
          return statistics.innerHTML = "Пропущено: " + dismiss + ", отказов: " + disagree + ", согласий: " + agree;
        }
      }
    }
  });

}).call(this);
