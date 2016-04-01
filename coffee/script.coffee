getData = ->
  serverData.pop()

data = getData()

setImages = ()->
  setThumbnails()
  setMainImage(0)

setThumbnails = ()->
  thumbsContainer.innerHTML = ""
  for item in data["photos"]
    thumbUrl = item["size48"]
    itemId = data["photos"].indexOf(item)
    thumb = document.createElement("img")
    thumb.setAttribute("src", thumbUrl)
    thumb.classList.add("thumbnail")
    thumbsContainer.appendChild(thumb)

setMainImage = (ind)->
  mainImageUrl = data["photos"][ind]["sizeBox"]
  mainImageContainer.style.backgroundImage = "url(#{mainImageUrl})"

setInfo = ()->
  name = data["name"]
  age = data["age"]
  city = data["cityName"]
  info = "#{age}, #{city}"
  nameContainer.innerHTML = name
  otherInfo.innerHTML = info
  if data["gender"] == "w"
    gender.innerHTML = "ней"
  else
    gender.innerHTML = "ним"

thumbsContainer = document.getElementById("thumbsContainer")
mainImageContainer = document.getElementById("mainImageContainer")
buttonsContainer = document.querySelector(".buttons-container")
nameContainer = document.getElementById("name")
otherInfo = document.getElementById("other")
statistics = document.getElementById("statistics")
gender = document.getElementById("gender")
dismiss = 0
agree = 0
disagree = 0
buttonClicks = 0
setImages()
setInfo()

window.ready = ( ->
  window.prepare = ->
    allThumbs = thumbsContainer.querySelectorAll('.thumbnail')
    allThumbsList = Array.prototype.slice.call(allThumbs, 0)
    document.querySelector(".thumbnail").classList.add("active")
    [].forEach.call(allThumbs, (i)->
      i.addEventListener("click", ->
        previous = document.querySelector(".active")
        previous.classList.remove("active")
        this.classList.add("active")
        mainImageContainer.innerHTML = ""
        ind = allThumbsList.indexOf(this)
        setMainImage(ind)
      )
    )
  prepare()
)()

document.addEventListener("click", (e)->
  if e.target.id == "dismiss" or e.target.id == "disagree" or e.target.id == "agree"
    buttonClicks += 1
    switch e.target.id
      when "dismiss" then dismiss += 1
      when "disagree" then disagree += 1
      when "agree" then agree += 1
    if serverData.length != 0
      data = getData()
      setImages()
      setInfo()
      allThumbs = thumbsContainer.querySelectorAll('.thumbnail')
      allThumbsList = Array.prototype.slice.call(allThumbs, 0)
      document.querySelector(".thumbnail").classList.add("active")
      [].forEach.call(allThumbs, (i)->
        i.addEventListener("click", ->
          previous = document.querySelector(".active")
          previous.classList.remove("active")
          this.classList.add("active")
          mainImageContainer.innerHTML = ""
          ind = allThumbsList.indexOf(this)
          setMainImage(ind)
        )
      )
      if buttonClicks >= 5
        statistics.innerHTML = "Пропущено: #{dismiss}, отказов: #{disagree}, согласий: #{agree}"
    else
      buttonsContainer.classList.add("disabled")
      statistics.innerHTML = "Пропущено: #{dismiss}, отказов: #{disagree}, согласий: #{agree}"
)
