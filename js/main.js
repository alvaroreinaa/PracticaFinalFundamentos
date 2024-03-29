var body = document.getElementsByTagName('body')[0];

function crear_tabla() {
    let flex_container = document.createElement("div");
    flex_container.id = "main_div";
    flex_container.clasName = "flex-container";
    body.appendChild(flex_container);

    let table = document.createElement("table");
    table.id = "table";
    table.setAttribute('border', 1);
    flex_container.appendChild(table);
}

function pintar_headers() {
    let row_headers = document.createElement('tr');

    let headerCentro = document.createElement('th');
    let headerContacto = document.createElement('th');
    let headerEstudio = document.createElement('th');
    let headerDuracionPrecio = document.createElement('th');

    headerContacto.scope = "col";
    headerCentro.scope = "col";
    headerEstudio.scope = "col";
    headerDuracionPrecio.scope = "col";

    headerCentro.innerHTML = 'CENTRO';
    headerContacto.innerHTML = 'CONTACTO';
    headerEstudio.innerHTML = 'TITULACÍON';
    headerDuracionPrecio.innerHTML = 'DURACIÓN Y PRECIO';

    headerCentro.id = "centro";
    headerContacto.id = "contacto";
    headerEstudio.id = "grado";
    headerDuracionPrecio.id = "precio";

    row_headers.appendChild(headerCentro);
    row_headers.appendChild(headerContacto);
    row_headers.appendChild(headerEstudio);
    row_headers.appendChild(headerDuracionPrecio);
    return row_headers;
}

function pintar(obj) {
    var tables = document.getElementById("table");
    tables.appendChild(pintar_headers());
    for (let i = 0; i < obj.length; i++) {
        pintartd(tables, obj, i);
    }
};

function pintartd(table, obj, i) {
    let row = document.createElement('tr');
    table.appendChild(row);

    var centroTd = document.createElement('td');
    var contactoTd = document.createElement('td');
    var gradoTd = document.createElement('td');
    var duracionPrecioTd = document.createElement('td');

    centroTd.className = obj[i].centro;
    contactoTd.className = obj[i].telefono;
    gradoTd.className = obj[i].grado;
    duracionPrecioTd.className = obj[i].precio;


    var centro = document.createElement('p');
    centro.innerHTML = obj[i].centro;
    centroTd.appendChild(centro);

    var img = document.createElement('img');
    img.setAttribute('src', obj[i].logo);
    img.setAttribute('width', 150);
    img.setAttribute('height', 150);
    if ((obj[i].centro.substring(0, 11) == "Universidad" || obj[i].centro.substring(0, 11) == "Universitat") && (obj[i].centro.substring(12, 14) != "de") && (obj[i].centro != "Universidade da Coruña"))
        centroTd.value = obj[i].centro.substring(11).trim();
    else if (obj[i].centro.substring(12, 14) == "de")
        centroTd.value = obj[i].centro.substring(14).trim();
    else if (obj[i].centro == "Universidade da Coruña")
        centroTd.value = "Coruña";
    else
        centroTd.value = obj[i].centro.trim();
    centroTd.appendChild(img);

    var correo = document.createElement('p');
    var a = document.createElement('a');
    a.href = "mailto:" + obj[i].correo;
    a.innerHTML = obj[i].correo;
    correo.appendChild(a);
    contactoTd.appendChild(correo);

    var telefono = document.createElement('p');
    telefono.innerHTML = obj[i].telefono;
    contactoTd.appendChild(telefono);

    var web = document.createElement('p');
    a = document.createElement('a');
    a.href = obj[i].web;
    a.innerHTML = 'Web';
    web.appendChild(a);
    contactoTd.appendChild(web);

    gradoTd.innerHTML = obj[i].estudio;

    var duracion = document.createElement('p');
    duracion.innerHTML = obj[i].duracion;
    duracionPrecioTd.appendChild(duracion);

    var precio = document.createElement('p');
    precio.innerHTML = obj[i].precio + "€ Anuales";
    duracionPrecioTd.appendChild(precio);
    if (obj[i].precio != "(a consultar)")
        duracionPrecioTd.value = obj[i].precio;
    else
        duracionPrecioTd.value = 0;

    centroTd.id = "centro" + i;
    contactoTd.id = "contacto" + i;
    gradoTd.id = "grado" + i;
    duracionPrecioTd.id = "precio" + i;

    row.appendChild(centroTd);
    row.appendChild(contactoTd);
    row.appendChild(gradoTd);
    row.appendChild(duracionPrecioTd);
}

function ordenar(dir, selected_thing) {
    var table = document.getElementById("table");
    var tr = document.getElementsByTagName("tr");
    switch (selected_thing) {
        case "CENTRO":
            sortTable(table, 0);
            break;
        case "DURACIÓN Y PRECIO":
            sortNumbers(table, 3);
            break;
        default:
            break;
    }
}

window.onscroll = function() { scrollfunction() };

function scrollfunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-50px";
    }
}
document.getElementById('info_div').addEventListener("mouseenter", e => {
    document.getElementById("navbar").style.top = "0px";
});
document.getElementById('info_div').addEventListener("mouseleave", e => {
    document.getElementById("navbar").style.top = "-50px";
});
document.getElementById('navbar').addEventListener("mouseenter", e => {
    document.getElementById("navbar").style.top = "0px";
});
document.getElementById('navbar').addEventListener("mouseleave", e => {
    document.getElementById("navbar").style.top = "-50px";
});


function sortTable(table, n) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.value.toLowerCase() > y.value.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.value.toLowerCase() < y.value.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}



function sortNumbers(table, n) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (Number(x.value) > Number(y.value)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (Number(x.value) < Number(y.value)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
