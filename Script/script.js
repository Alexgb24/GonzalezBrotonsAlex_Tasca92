/**
 * Alex González Brotons
 * Llenguatge de marques
 * Búsqueda de imagenes en flickr
 */

 /** Esta función se encarga de formatear las etiquetas */
 function hacerEtiquetas(tags) {
    let etiquetas = tags.split(" ");
    let resultado = ""
    $.each(etiquetas,
        function(index, etiqueta) {
            resultado += "<span class='badge badge-light'>" + etiqueta + "</span> "
        }
    );
    return resultado;
}

/** Esta función rellena el contenido de la tabla */
function hacerTabla(json) {
    $("#cTabla").html("");
    $.each(json.items,
        function(index, item) {
            let elemento = $("<tr><td>" + item.title + "</td>"
            + "<td><img src='" + item.media.m + "'></td>"
            + "<td>" + item.date_taken + "</td>"
            + "<td>" + item.author + "</td>"
            + "<td>" + hacerEtiquetas(item.tags) + "</td>"
            + "<td><a href='" + item.link + "' target='blank'>"
            + "<button type='button' class='btn btn-warning'>Link</button></tr>");
            elemento.appendTo("#cTabla");
        }
    );
}

/** función que genera la string */
function stringJson() {
    let peticion = "https://api.flickr.com/services/feeds/photos_public.gne?"
    + "format=json&jsoncallback=?" + "&tags=";
    peticion += $("#etiquetas").val().split(" ").join();
    peticion += "&tagmode=" + $("#rangoEtiquetas").val();
    return peticion;
}

/** Hace las llamadas a los metodos y rellena la tabla */
function rellenarTabla() {
    let peticion = stringJson();
    $.getJSON(peticion, hacerTabla);
}

/** Esta función vacía la tabla */
function limpiar() {
    $("#etiquetas").val("");
    $("#cTabla").html("");
    $("#rangoEtiquetas").val("all");
}

//Función que comprueba si se pulsa la tecla enter, hace la petición ajax cuando es la tecla presionada */
function Enter(event) {
    if (event.key == "Enter") {
        rellenarTabla();
    }
}