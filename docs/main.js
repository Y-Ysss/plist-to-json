document.getElementById('convert').addEventListener('click', () => {
    const val = document.getElementById('input').value
    const conv = new Converter(val)
    const output = document.getElementById('output')
    output.value = conv.convertJsonString()
    output.disabled = false
    document.getElementById('copy').disabled = false
})
document.getElementById('copy').addEventListener('click', () => {
    document.getElementById("output").select()
    document.execCommand("copy")
})