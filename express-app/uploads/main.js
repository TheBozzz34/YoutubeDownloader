function onPress() {
    const idValue = document.getElementById("vid_id").value;
    let vid_url = document.URL + idValue + '.mp4'
    window.location.href = vid_url;
}
