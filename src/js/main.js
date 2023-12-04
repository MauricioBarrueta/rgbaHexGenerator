const red = document.getElementById('red'), redValue = document.getElementById('redRange'),
    green = document.getElementById('green'), greenValue = document.getElementById('greenRange'),
    blue = document.getElementById('blue'), blueValue = document.getElementById('blueRange'),
    alpha = document.getElementById('alpha'), alphaValue = document.getElementById('alphaRange'),
    hexCode = document.getElementById('hex-code') 

const colorProperties = document.querySelectorAll('.color-properties input[type=range], input[type=number]'),
    bgColorPreview = document.querySelector('.preview'), rgbInput = document.getElementById('rgbInput'), rgbaInput = document.getElementById('rgbaInput'),
    hexInput = document.getElementById('hexInput')

window.onload = () => {
    resetElements()
    colorCodesGenerator()
}

/* Se llama a la función cada que el valor de alguno de los elementos 'input' cambia */
colorProperties.forEach(element => {
    element.addEventListener('input', () => { colorCodesGenerator() })
});

/* Función que convierte del modelo RGB al Hexadecimal */
const rgbToHexConverter = (r, g, b) => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

/* Función que convierte del modelo Hexadecimal al modelo RGB */
const hexToRgbConverter = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

/* Convierte el valor hexadecimal al modelo rgb-rgba cada que el valor del elemento 'input text' cambia */
hexCode.addEventListener('input', () => {    
    let r, g, b
    var hex = hexCode.value
    r = red.value = redValue.value = hexToRgbConverter(hex).r
    g = green.value = greenValue.value = hexToRgbConverter(hex).g
    b = blue.value = blueValue.value = hexToRgbConverter(hex).b     
    bgColorPreview.style.background = `rgba(${r}, ${g}, ${b}, ${alpha.value})`
    colorCodesGenerator()
})

/* Función que genera el color de acuerdo a los valores y los muestra en el 'input' correspondiente al modelo */
const colorCodesGenerator = () => {   
    let r = `${red.value}`, g = `${green.value}`, b = `${blue.value}` 
    hexCode.value = rgbToHexConverter(r, g, b)

    bgColorPreview.style.background = `rgba(${r}, ${g}, ${b}, ${alpha.value})`
    rgbInput.value = `rgb(${r}, ${g}, ${b});`
    rgbaInput.value = `rgba(${r}, ${g}, ${b}, ${alpha.value});`
    hexInput.value = `${hexCode.value};`
}

/* Copia el valor del input de acuerdo al botón seleccionado */
const copyButtons = document.querySelectorAll('.color-code-value button')
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        var selectedInput = button.id === 'rgbButton' ? rgbInput: button.id === 'rgbaButton' ? rgbaInput: hexInput               
        selectedInput.select()
        selectedInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(selectedInput == hexInput ? selectedInput.value.toUpperCase() : selectedInput.value)
    })   
});

const resetElements = () => {
    red.value = redValue.value = 249, green.value = greenValue.value = 220, blue.value = blueValue.value = 92, alpha.value = alphaValue.value = 1
}