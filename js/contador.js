function getChecked() {
    
    input = document.querySelectorAll('input')

    console.log(input)

    for(c = 0; c < input.length; c++) {

        if(input[c].checked == true) {
            
            return input[c].value
            break
        }
    }
}

function sobreEscrever(objeto, id, index) { // Substitui a alternativa
    
    memoriaSplit = memoria.split(" ")
    
    memoriaSplit[index] = `${id}:${entrada}`// id = Questão e Entrada = Alternativa selecionada

    return memoriaSplit.join(" ")
}

function escrever(objeto, id) { // Aqui grava caso não haja substituição
    
    memoriaSplit = memoria.split(" ")
    
    memoriaSplit.push(`${id}:${entrada}`) // Push adiciona ao final do vetor o item informado

    return memoriaSplit.join(" ")
}

function gravar(oQueGravar) { // Grava a subsituição da alternativa

    sessionStorage.setItem("respostas", oQueGravar)
}

function salvarFormulario(id) {
    
    entrada = getChecked()

    if(sessionStorage.getItem("respostas")) {
        let substituiu = false

        memoria = sessionStorage.getItem("respostas")
        
        memoriaSplit = memoria.split(" ")

        for(c = 0; c < memoriaSplit.length; c++) {
        
            if(memoriaSplit[c].split(":")[0] == id) {

                substituiu = true
                
                index = c;
            
                gravar(sobreEscrever(memoria, id, index))

                break
            }
        }
        if(!substituiu) {
            gravar(escrever(memoria, id))
        }
    }
    else {
        sessionStorage.setItem("respostas", `${id}:${entrada}`)
    }
}

function autofill(id) {
    memoria = sessionStorage.getItem("respostas") // Pega as respostas
        
        memoriaSplit = memoria.split(" ")

        for(c = 0; c < memoriaSplit.length; c++) {

            if(memoriaSplit[c].split(":")[0] == id) {

                toFill = memoriaSplit[c].split(":")[1]

                console.log(toFill)

                document.querySelector(`input[value="${toFill}"]`).checked = true // Alterar para o querySelector
                break
            }
        }
}

function resultado() {
    gabarito = ["Q1:A","Q2:C","Q3:E","Q4:B","Q5:D","Q6:C","Q7:E","Q8:D"
    ,"Q9:A","Q10:C","Q11:A","Q12:C","Q13:B","Q14:A","Q15:A","Q16:C","Q17:B",
    "Q18:C","Q19:B","Q20:D","Q21:A","Q22:ED","Q23:D","Q24:B","Q25:D",
    "Q26:D","Q27:E","Q28:E","Q29:A","Q30:D","Q31:C","Q32:E","Q33:B","Q34:D","Q35:B"] // Colocar o gabarito das 35 questões

    quebrar = sessionStorage.getItem("respostas").split(" ")
    corretas = 0;


    for(c = 0; c < quebrar.length; c++) {
        if(gabarito.indexOf(quebrar[c]) > - 1) { // IndexOf retorna 0 caso encontre e -1 caso não encontre
            corretas++;
        }
    }
    console.log(corretas)
    


    document.getElementById("acertos").innerHTML = `Você acertou: ${corretas} / 35`
    // document.getElementById("escolha").innerHTML = `Suas respostas: ${quebrar}`
}

function reset() {
    sessionStorage.clear()
}

