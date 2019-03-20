const formModel = {}

formModel.pushVideoArray = (form) => {
  const linkArray = form.getModel().video.links ? form.getModel().video.links : []
  const newVideo = { 'host': '', 'address': '' }
  const increasedArray = linkArray === [] || linkArray === [undefined] ? [newVideo] : linkArray.concat(newVideo)
  form.change('video.link', increasedArray)
}

formModel.popVideoArray = (form) => {
  let linkArray = form.getModel().video.links
  const reducedArray = linkArray.length > 1 ? linkArray.slice(0, linkArray.length - 1) : null
  form.change('video.links', reducedArray)
}

formModel.resetVideoArray = (form) => {
  form.change('video.links', null)
}

export default formModel
