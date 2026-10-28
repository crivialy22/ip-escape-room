const buttons = document.querySelectorAll("[data-screen]");
const screens = document.querySelectorAll(".screen");

buttons.forEach(button => {
    if (button.id === "turpinat-poga") return;

    button.addEventListener("click", () => {
        const targetId = button.dataset.screen;

        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        document.getElementById(targetId).classList.add("active");
    });
});
const usernameInput = document.getElementById("iesakt");
const continueButton = document.getElementById("turpinat-poga");
const errorMessage = document.getElementById("error");

continueButton.addEventListener("click", () => {
    if (usernameInput.value.trim() === "") {
        errorMessage.hidden = false;
    } else {
        errorMessage.hidden = true;

        // Navigate to the next screen
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("active");
        });

        document.getElementById("continue").classList.add("active");
    }
});


const overlay = document.getElementById("popup-overlay");

/* ATVER LOGUS */
document.querySelectorAll("[data-popup]").forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.popup;
        const windowToOpen = document.getElementById(targetId);

        if (!windowToOpen) return;

        windowToOpen.hidden = false;

        // Darken the background only for clues and code
        const needsOverlay =
            windowToOpen.classList.contains("clues-popup") ||
            windowToOpen.classList.contains("code-popup");

        if (needsOverlay) {
            overlay.hidden = false;
        }
    });
});





/* AIZVER LOGUS */
document.querySelectorAll(".aizvert-poga").forEach(button => {
    button.addEventListener("click", () => {
        const windowToClose = button.closest(
            ".popup, .clues-popup, .code-popup"
        );

        if (!windowToClose) return;

        windowToClose.hidden = true;

        // Keep the overlay while any clue or code window remains open
        const openWindows = document.querySelectorAll(
            ".clues-popup:not([hidden]), .code-popup:not([hidden])"
        );

        overlay.hidden = openWindows.length === 0;
    });
});



/* VELKAMIE LOGI */
document.querySelectorAll(".popup").forEach(popup => {
    const handle = popup.querySelector(".drag-handle");

    if (!handle) return;

    let startX, startY, initialLeft, initialTop;

    handle.addEventListener("pointerdown", event => {
        // Only drag with the main mouse button
        if (event.button !== 0) return;

        const rect = popup.getBoundingClientRect();

        // Convert the popup's position to fixed screen coordinates
        popup.style.position = "fixed";
        popup.style.left = rect.left + "px";
        popup.style.top = rect.top + "px";
        popup.style.transform = "none";

        startX = event.clientX;
        startY = event.clientY;
        initialLeft = rect.left;
        initialTop = rect.top;

        handle.setPointerCapture(event.pointerId);
        event.preventDefault();
    });

    handle.addEventListener("pointermove", event => {
        if (!handle.hasPointerCapture(event.pointerId)) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        popup.style.left = initialLeft + dx + "px";
        popup.style.top = initialTop + dy + "px";
    });

    handle.addEventListener("pointerup", event => {
        if (handle.hasPointerCapture(event.pointerId)) {
            handle.releasePointerCapture(event.pointerId);
        }
    });

    handle.addEventListener("pointercancel", event => {
        if (handle.hasPointerCapture(event.pointerId)) {
            handle.releasePointerCapture(event.pointerId);
        }
    });
});
//unavailable msg
const unavailableButtons = document.querySelectorAll(".unavailable");
const unavailableMessage = document.getElementById("unavailable-message");

unavailableButtons.forEach(button => {
    button.addEventListener("click", () => {
        unavailableMessage.hidden = false;
    });
});


/* KODA PARBAUDE */
const codeForm = document.getElementById("code-form");
const codeInput = document.getElementById("code-input");
const codeMessage = document.getElementById("code-message");
const congratulations = document.getElementById("congratulations");

codeForm.addEventListener("submit", event => {
    event.preventDefault();

    const ievaditaisKods = codeInput.value.trim();

    if (ievaditaisKods === "672") {
        // Aizver visus atvertos logus
        document.querySelectorAll(
            ".popup, .clues-popup, .code-popup"
        ).forEach(windowElement => {
            windowElement.hidden = true;
        });

        // Noņem tumšo pārklājumu
        overlay.hidden = true;

        // Paslēpj iepriekšējo kļūdas paziņojumu
        codeMessage.hidden = true;

        // Atgriežas sākuma ekrānā
        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        document.getElementById("sakt").classList.add("active");

        // Parāda apsveikumu
        congratulations.hidden = false;

    } else {
        codeMessage.textContent =
            "Nepareizs kods! Izpēti dokumentus un mēģini vēlreiz.";

        codeMessage.hidden = false;
    }
});

/* ===== ACTUS ASISTENTS ===== */

const miZinojumi = document.getElementById("mi-ziņojumi");
const miForma = document.getElementById("mi-forma");
const miJautajums = document.getElementById("mi-jautajums");

const actusPortrets = document.getElementById("actus-portrets-attels");

if (miZinojumi && miForma && miJautajums && actusPortrets) {

    
    let pozasIndekss = 0;

    // Nomaini šos failu nosaukumus, ja tavi attēli sauksies citādi.
    const actusPozas = [
        "Actus-reading.jpeg",
        "Actus-thinking.jpeg",
        //"actus-surprised.jpeg"
    ];

actusPozas.forEach(function (fails) {
    const attels = new Image();
    attels.src = fails;
});

    function paraditZinu(teksts) {
        // Iepriekšējā ziņa pazūd; redzama tikai jaunā.
        miZinojumi.textContent = teksts;

        // Pārslēdz Actus pozu.
        pozasIndekss = (pozasIndekss + 1) % actusPozas.length;
        actusPortrets.src = actusPozas[pozasIndekss];
    }

    function atbildet(ievade) {
        const jautajums = ievade.toLowerCase();

        if (
            jautajums.includes("atbilde") ||
            jautajums.includes("kods") ||
            jautajums.includes("cipar")
        ) {
            return "Mēģini sadalīt uzdevumu atsevišķos soļos. " +
                "Katram koda ciparam ir savs pavediens. " +
                "Vai esi atradis visus trīs?";
        }

        if (
            jautajums.includes("patents") ||
            jautajums.includes("aizsarg") ||
            jautajums.includes("izgudroj")
        ) {
            return "Padomā, ko tieši Elza ir izveidojusi un " +
                "kādu tehnisku problēmu viņas robots risina. " +
                "Aplūko situācijas aprakstu un dokumentus.";
        }

        if (
            jautajums.includes("dat") ||
            jautajums.includes("iesnieg") ||
            jautajums.includes("pieteikum")
        ) {
            return "Meklē dokumentu, kurā minēts patenta " +
                "pieteikums. Pievērs uzmanību datumam un " +
                "tam, kuru tā daļu uzdevums liek izmantot.";
        }

        if (
            jautajums.includes("reģistr") ||
            jautajums.includes("registr") ||
            jautajums.includes("numur")
        ) {
            return "Atrodi reģistra ierakstu ar norādi " +
                "“Patents piešķirts”. Izlasi uzdevuma " +
                "nosacījumu par reģistrācijas numuru.";
        }

        if (
            jautajums.includes("sensor") ||
            jautajums.includes("funkc") ||
            jautajums.includes("ziņoj") ||
            jautajums.includes("zinoj")
        ) {
            return "Pārskati ziņojumu par robota sensoriem. " +
                "Kura funkcija apraksta to, kā robots " +
                "reaģē uz loga malu?";
        }

        if (
            jautajums.includes("nesaprotu") ||
            jautajums.includes("palīdz") ||
            jautajums.includes("palidz") ||
            jautajums.includes("iestrēdz") ||
            jautajums.includes("iestrēg") ||
            jautajums.includes("iestrēg")
        ) {
            return "Nekas — sadalīsim uzdevumu mazākos soļos. " +
                "Vispirms izvēlies vienu pavedienu, kuru " +
                "vēl neesi izpētījis. Ko tajā vari atrast?";
        }

        return "Es varu palīdzēt ar patenta pieteikumu, " +
            "reģistra ierakstu un robota sensoru funkcijām. " +
            "Kurš no šiem pavedieniem tev sagādā grūtības?";
    }

    miForma.addEventListener("submit", function (notikums) {
        notikums.preventDefault();

        const teksts = miJautajums.value.trim();

        if (!teksts) return;

        const atbilde = atbildet(teksts);
        paraditZinu(atbilde);

        miJautajums.value = "";
      
        miJautajums.focus();
    });

}


