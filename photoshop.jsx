// ============================================
// A4 Photo Enhancer - For Gemini AI Images
// Optimized for Color AI Generated Images
// ============================================

#target photoshop

app.preferences.rulerUnits = Units.MM;
app.preferences.typeUnits = TypeUnits.POINT;

// ============================================
// GLOBAL VARIABLES
// ============================================

var sourceFolderPath = "";
var outputFolderPath = "";
var isProcessing = false;

// ============================================
// MAIN UI
// ============================================

function createMainUI() {

    var win = new Window("dialog", "A4 Photo Enhancer - Gemini AI Images", undefined);
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 8;
    win.margins = [15, 15, 15, 15];
    win.preferredSize.width = 550;

    // ==========================================
    // HEADER
    // ==========================================

    var headerGrp = win.add("panel");
    headerGrp.orientation = "column";
    headerGrp.alignChildren = ["center", "center"];
    headerGrp.margins = [10, 15, 10, 15];
    headerGrp.spacing = 5;

    var title = headerGrp.add("statictext", undefined, "A4 Photo Enhancer Tool");
    title.graphics.font = ScriptUI.newFont("Arial", "BOLD", 20);

    var subline = headerGrp.add("statictext", undefined, "Specially Optimized for Gemini AI Color Images");
    subline.graphics.font = ScriptUI.newFont("Arial", "ITALIC", 11);

    var tagline = headerGrp.add("statictext", undefined, "Open Image  >>  Place on A4  >>  Enhance Quality  >>  Save");
    tagline.graphics.font = ScriptUI.newFont("Arial", "Regular", 10);

    // ==========================================
    // FOLDER SECTION
    // ==========================================

    var folderPanel = win.add("panel", undefined, "  STEP 1 - Select Folders  ");
    folderPanel.orientation = "column";
    folderPanel.alignChildren = ["fill", "top"];
    folderPanel.margins = [15, 20, 15, 15];
    folderPanel.spacing = 12;

    // Source Folder Row
    var srcGrp = folderPanel.add("group");
    srcGrp.orientation = "row";
    srcGrp.alignChildren = ["left", "center"];
    srcGrp.spacing = 8;

    var srcIcon = srcGrp.add("statictext", undefined, "INPUT :");
    srcIcon.graphics.font = ScriptUI.newFont("Arial", "BOLD", 11);
    srcIcon.preferredSize.width = 60;

    var srcPathBox = srcGrp.add("edittext", undefined, "Click Browse to select folder with Gemini images...");
    srcPathBox.preferredSize.width = 330;
    srcPathBox.preferredSize.height = 26;
    srcPathBox.enabled = false;

    var srcBrowse = srcGrp.add("button", undefined, "Browse");
    srcBrowse.preferredSize.width = 80;
    srcBrowse.preferredSize.height = 26;

    // Output Folder Row
    var outGrp = folderPanel.add("group");
    outGrp.orientation = "row";
    outGrp.alignChildren = ["left", "center"];
    outGrp.spacing = 8;

    var outIcon = outGrp.add("statictext", undefined, "OUTPUT :");
    outIcon.graphics.font = ScriptUI.newFont("Arial", "BOLD", 11);
    outIcon.preferredSize.width = 60;

    var outPathBox = outGrp.add("edittext", undefined, "Click Browse to select output folder...");
    outPathBox.preferredSize.width = 330;
    outPathBox.preferredSize.height = 26;
    outPathBox.enabled = false;

    var outBrowse = outGrp.add("button", undefined, "Browse");
    outBrowse.preferredSize.width = 80;
    outBrowse.preferredSize.height = 26;

    // ==========================================
    // A4 PAGE SETTINGS
    // ==========================================

    var pagePanel = win.add("panel", undefined, "  STEP 2 - A4 Page Settings  ");
    pagePanel.orientation = "column";
    pagePanel.alignChildren = ["fill", "top"];
    pagePanel.margins = [15, 20, 15, 15];
    pagePanel.spacing = 10;

    // Row 1 - DPI and Orientation
    var pageRow1 = pagePanel.add("group");
    pageRow1.orientation = "row";
    pageRow1.spacing = 15;
    pageRow1.alignChildren = ["left", "center"];

    var dpiLbl = pageRow1.add("statictext", undefined, "Print Quality :");
    dpiLbl.preferredSize.width = 100;
    dpiLbl.graphics.font = ScriptUI.newFont("Arial", "BOLD", 10);

    var dpiDrop = pageRow1.add("dropdownlist", undefined, [
        "300 DPI  (Standard Print)",
        "150 DPI  (Draft Print)",
        "600 DPI  (High Quality Print)",
        "72 DPI   (Screen Only)"
    ]);
    dpiDrop.selection = 0;
    dpiDrop.preferredSize.width = 185;

    var sepLbl1 = pageRow1.add("statictext", undefined, "   ");

    var orientLbl = pageRow1.add("statictext", undefined, "Orientation :");
    orientLbl.graphics.font = ScriptUI.newFont("Arial", "BOLD", 10);

    var orientDrop = pageRow1.add("dropdownlist", undefined, ["Portrait (Vertical)", "Landscape (Horizontal)"]);
    orientDrop.selection = 0;
    orientDrop.preferredSize.width = 165;

    // Row 2 - Fit Mode and Background
    var pageRow2 = pagePanel.add("group");
    pageRow2.orientation = "row";
    pageRow2.spacing = 15;
    pageRow2.alignChildren = ["left", "center"];

    var fitLbl = pageRow2.add("statictext", undefined, "Image Fit :");
    fitLbl.preferredSize.width = 100;
    fitLbl.graphics.font = ScriptUI.newFont("Arial", "BOLD", 10);

    var fitDrop = pageRow2.add("dropdownlist", undefined, [
        "Fit to A4 (Keep Ratio)",
        "Fill Full A4 (May Crop)",
        "Stretch to A4 (No Crop)",
        "Center Only (Keep Size)"
    ]);
    fitDrop.selection = 0;
    fitDrop.preferredSize.width = 185;

    var sepLbl2 = pageRow2.add("statictext", undefined, "   ");

    var bgLbl = pageRow2.add("statictext", undefined, "Background :");
    bgLbl.graphics.font = ScriptUI.newFont("Arial", "BOLD", 10);

    var bgDrop = pageRow2.add("dropdownlist", undefined, [
        "White",
        "Light Gray",
        "Dark Gray",
        "Black"
    ]);
    bgDrop.selection = 0;
    bgDrop.preferredSize.width = 165;

    // Row 3 - Margin Setting
    var pageRow3 = pagePanel.add("group");
    pageRow3.orientation = "row";
    pageRow3.spacing = 15;
    pageRow3.alignChildren = ["left", "center"];

    var marginLbl = pageRow3.add("statictext", undefined, "Page Margin :");
    marginLbl.preferredSize.width = 100;
    marginLbl.graphics.font = ScriptUI.newFont("Arial", "BOLD", 10);

    var marginDrop = pageRow3.add("dropdownlist", undefined, [
        "No Margin (Full Bleed)",
        "5mm Margin",
        "10mm Margin",
        "15mm Margin",
        "20mm Margin"
    ]);
    marginDrop.selection = 0;
    marginDrop.preferredSize.width = 185;

    // ==========================================
    // ENHANCEMENT SETTINGS
    // ==========================================

    var enhPanel = win.add("panel", undefined, "  STEP 3 - AI Image Enhancement Settings  ");
    enhPanel.orientation = "column";
    enhPanel.alignChildren = ["fill", "top"];
    enhPanel.margins = [15, 20, 15, 15];
    enhPanel.spacing = 10;

    // Enhancement Info
    var enhInfo = enhPanel.add("statictext", undefined, "These settings are optimized to improve Gemini AI generated color images:");
    enhInfo.graphics.font = ScriptUI.newFont("Arial", "ITALIC", 10);

    // Checkboxes Row 1
    var enhRow1 = enhPanel.add("group");
    enhRow1.orientation = "row";
    enhRow1.spacing = 15;
    enhRow1.alignChildren = ["left", "center"];

    var chkLevels = enhRow1.add("checkbox", undefined, "Auto Levels");
    chkLevels.value = true;
    chkLevels.preferredSize.width = 110;

    var chkContrast = enhRow1.add("checkbox", undefined, "Auto Contrast");
    chkContrast.value = true;
    chkContrast.preferredSize.width = 120;

    var chkColor = enhRow1.add("checkbox", undefined, "Auto Color Balance");
    chkColor.value = true;
    chkColor.preferredSize.width = 140;

    var chkSharpen = enhRow1.add("checkbox", undefined, "Smart Sharpen");
    chkSharpen.value = true;

    // Checkboxes Row 2
    var enhRow2 = enhPanel.add("group");
    enhRow2.orientation = "row";
    enhRow2.spacing = 15;
    enhRow2.alignChildren = ["left", "center"];

    var chkVibrance = enhRow2.add("checkbox", undefined, "Boost Vibrance");
    chkVibrance.value = true;
    chkVibrance.preferredSize.width = 110;

    var chkSaturation = enhRow2.add("checkbox", undefined, "Color Saturation");
    chkSaturation.value = false;
    chkSaturation.preferredSize.width = 120;

    var chkBrightness = enhRow2.add("checkbox", undefined, "Brightness/Contrast");
    chkBrightness.value = false;
    chkBrightness.preferredSize.width = 140;

    var chkNoise = enhRow2.add("checkbox", undefined, "Reduce Noise");
    chkNoise.value = false;

    // Vibrance Slider
    var vibranceRow = enhPanel.add("group");
    vibranceRow.orientation = "row";
    vibranceRow.spacing = 10;
    vibranceRow.alignChildren = ["left", "center"];

    var vibLbl = vibranceRow.add("statictext", undefined, "Vibrance Amount :");
    vibLbl.preferredSize.width = 130;
    vibLbl.graphics.font = ScriptUI.newFont("Arial", "BOLD", 10);

    var vibSlider = vibranceRow.add("slider", undefined, 30, 0, 100);
    vibSlider.preferredSize.width = 200;

    var vibValue = vibranceRow.add("statictext", undefined, "30");
    vibValue.preferredSize.width = 30;

    vibSlider.onChanging = function() {
        vibValue.text = Math.round(vibSlider.value);
    };

    // Sharpen Slider
    var sharpenRow = enhPanel.add("group");
    sharpenRow.orientation = "row";
    sharpenRow.spacing = 10;
    sharpenRow.alignChildren = ["left", "center"];

    var sharpLbl = sharpenRow.add("statictext", undefined, "Sharpen Amount :");
    sharpLbl.preferredSize.width = 130;
    sharpLbl.graphics.font = ScriptUI.newFont("Arial", "BOLD", 10);

    var sharpSlider = sharpenRow.add("slider", undefined, 50, 0, 200);
    sharpSlider.preferredSize.width = 200;

    var sharpValue = sharpenRow.add("statictext", undefined, "50");
    sharpValue.preferredSize.width = 30;

    sharpSlider.onChanging = function() {
        sharpValue.text = Math.round(sharpSlider.value);
    };

    // ==========================================
    // SAVE FORMAT SETTINGS
    // ==========================================

    var savePanel = win.add("panel", undefined, "  STEP 4 - Save Format  ");
    savePanel.orientation = "row";
    savePanel.alignChildren = ["left", "center"];
    savePanel.margins = [15, 20, 15, 15];
    savePanel.spacing = 15;

    var saveFmtLbl = savePanel.add("statictext", undefined, "Save Format :");
    saveFmtLbl.graphics.font = ScriptUI.newFont("Arial", "BOLD", 10);
    saveFmtLbl.preferredSize.width = 100;

    var saveDrop = savePanel.add("dropdownlist", undefined, [
        "JPEG - Maximum Quality (12)",
        "JPEG - High Quality (10)",
        "JPEG - Medium Quality (8)",
        "PNG - Lossless",
        "PDF - Print Ready (X-1a)",
        "TIFF - Uncompressed"
    ]);
    saveDrop.selection = 0;
    saveDrop.preferredSize.width = 220;

    var sepSave = savePanel.add("statictext", undefined, "  ");

    var addSuffixChk = savePanel.add("checkbox", undefined, "Add '_A4' suffix to filename");
    addSuffixChk.value = true;

    // ==========================================
    // PROGRESS SECTION
    // ==========================================

    var progressPanel = win.add("panel", undefined, "  Progress  ");
    progressPanel.orientation = "column";
    progressPanel.alignChildren = ["fill", "center"];
    progressPanel.margins = [15, 15, 15, 15];
    progressPanel.spacing = 8;

    var progressBar = progressPanel.add("progressbar", undefined, 0, 100);
    progressBar.preferredSize.height = 22;
    progressBar.value = 0;

    var statusGrp = progressPanel.add("group");
    statusGrp.orientation = "row";
    statusGrp.alignChildren = ["center", "center"];

    var statusText = statusGrp.add("statictext", undefined, "Ready - Select folders and click Start");
    statusText.alignment = ["center", "center"];
    statusText.preferredSize.width = 480;

    var fileCountText = progressPanel.add("statictext", undefined, "Files Found: 0");
    fileCountText.alignment = ["center", "center"];
    fileCountText.graphics.font = ScriptUI.newFont("Arial", "BOLD", 10);

    // ==========================================
    // ACTION BUTTONS
    // ==========================================

    var btnPanel = win.add("group");
    btnPanel.orientation = "row";
    btnPanel.alignment = ["center", "center"];
    btnPanel.spacing = 12;
    btnPanel.margins = [0, 5, 0, 5];

    var btnStart = btnPanel.add("button", undefined, "START PROCESSING");
    btnStart.preferredSize.width = 180;
    btnStart.preferredSize.height = 38;
    btnStart.graphics.font = ScriptUI.newFont("Arial", "BOLD", 12);

    var btnPreview = btnPanel.add("button", undefined, "Preview Settings");
    btnPreview.preferredSize.width = 130;
    btnPreview.preferredSize.height = 38;

    var btnOpenOut = btnPanel.add("button", undefined, "Open Output");
    btnOpenOut.preferredSize.width = 120;
    btnOpenOut.preferredSize.height = 38;
    btnOpenOut.enabled = false;

    var btnClose = btnPanel.add("button", undefined, "Close");
    btnClose.preferredSize.width = 90;
    btnClose.preferredSize.height = 38;

    // ==========================================
    // BUTTON EVENTS
    // ==========================================

    // Browse Source
    srcBrowse.onClick = function() {
        var folder = Folder.selectDialog("Select Folder with Gemini AI Images");
        if (folder) {
            sourceFolderPath = folder.fsName;
            srcPathBox.text = folder.fsName;

            // Count files
            var files = getImageFiles(folder);
            fileCountText.text = "Files Found: " + files.length + " images in this folder";

            statusText.text = "Source folder selected - " + files.length + " images found";
        }
    };

    // Browse Output
    outBrowse.onClick = function() {
        var folder = Folder.selectDialog("Select Output Folder where A4 files will be saved");
        if (folder) {
            outputFolderPath = folder.fsName;
            outPathBox.text = folder.fsName;
            statusText.text = "Output folder selected";
        }
    };

    // Open Output Folder
    btnOpenOut.onClick = function() {
        if (outputFolderPath !== "") {
            var outF = new Folder(outputFolderPath);
            if (outF.exists) outF.execute();
        }
    };

    // Close Button
    btnClose.onClick = function() {
        win.close();
    };

    // Preview Settings
    btnPreview.onClick = function() {
        showPreviewInfo(dpiDrop, orientDrop, fitDrop, bgDrop, marginDrop, saveDrop);
    };

    // START PROCESSING
    btnStart.onClick = function() {

        // === VALIDATION ===
        if (sourceFolderPath === "") {
            alert("Please select the INPUT folder first!\n\nClick Browse next to INPUT");
            return;
        }
        if (outputFolderPath === "") {
            alert("Please select the OUTPUT folder first!\n\nClick Browse next to OUTPUT");
            return;
        }

        var srcFolder = new Folder(sourceFolderPath);
        var outFolder = new Folder(outputFolderPath);

        if (!srcFolder.exists) {
            alert("Source folder does not exist!\nPlease select again.");
            return;
        }

        // Create output if not exists
        if (!outFolder.exists) {
            outFolder.create();
        }

        // Get image files
        var imageFiles = getImageFiles(srcFolder);

        if (imageFiles.length === 0) {
            alert("No images found in source folder!\n\nSupported formats:\nJPG, JPEG, PNG, WEBP, TIFF, BMP, PSD");
            return;
        }

        // Confirm
        var confirmMsg = "Ready to process " + imageFiles.length + " Gemini AI images\n\n";
        confirmMsg += "Settings Summary:\n";
        confirmMsg += "- Quality: " + dpiDrop.selection.text + "\n";
        confirmMsg += "- Orientation: " + orientDrop.selection.text + "\n";
        confirmMsg += "- Fit Mode: " + fitDrop.selection.text + "\n";
        confirmMsg += "- Save as: " + saveDrop.selection.text + "\n\n";
        confirmMsg += "Output: " + outputFolderPath + "\n\n";
        confirmMsg += "Start processing?";

        if (!confirm(confirmMsg)) return;

        // === COLLECT SETTINGS ===
        var dpiArr = [300, 150, 600, 72];
        var marginArr = [0, 5, 10, 15, 20];

        var settings = {
            dpi           : dpiArr[dpiDrop.selection.index],
            orientation   : orientDrop.selection.index,     // 0=portrait 1=landscape
            fitMode       : fitDrop.selection.index,
            background    : bgDrop.selection.index,
            margin        : marginArr[marginDrop.selection.index],
            saveFormat    : saveDrop.selection.index,
            addSuffix     : addSuffixChk.value,
            autoLevels    : chkLevels.value,
            autoContrast  : chkContrast.value,
            autoColor     : chkColor.value,
            sharpen       : chkSharpen.value,
            vibrance      : chkVibrance.value,
            saturation    : chkSaturation.value,
            brightness    : chkBrightness.value,
            noiseReduce   : chkNoise.value,
            vibranceAmt   : Math.round(vibSlider.value),
            sharpenAmt    : Math.round(sharpSlider.value)
        };

        // === START LOOP ===
        btnStart.enabled = false;
        btnClose.enabled = false;
        progressBar.value = 0;

        var totalFiles = imageFiles.length;
        var successCount = 0;
        var failCount = 0;
        var failedFiles = [];

        for (var i = 0; i < imageFiles.length; i++) {

            var currentFile = imageFiles[i];
            statusText.text = "Processing: " + currentFile.name + "  (" + (i + 1) + " of " + totalFiles + ")";
            win.update();

            try {
                processGeminiImage(currentFile, outFolder, settings);
                successCount++;
            } catch (err) {
                failCount++;
                failedFiles.push(currentFile.name);
                $.writeln("FAILED: " + currentFile.name + " | Error: " + err.message);
            }

            // Update progress
            progressBar.value = Math.round(((i + 1) / totalFiles) * 100);
            win.update();
        }

        // === DONE ===
        btnStart.enabled = true;
        btnClose.enabled = true;
        btnOpenOut.enabled = true;
        statusText.text = "COMPLETE! Success: " + successCount + "  |  Failed: " + failCount;
        fileCountText.text = "Processed " + totalFiles + " files - All Done!";
        win.update();

        // Final Report
        var doneMsg = "Processing Complete!\n\n";
        doneMsg += "Total Files : " + totalFiles + "\n";
        doneMsg += "Successful  : " + successCount + "\n";
        doneMsg += "Failed      : " + failCount + "\n\n";

        if (failedFiles.length > 0) {
            doneMsg += "Failed Files:\n";
            for (var f = 0; f < failedFiles.length; f++) {
                doneMsg += "- " + failedFiles[f] + "\n";
            }
            doneMsg += "\n";
        }

        doneMsg += "Saved To:\n" + outputFolderPath;
        alert(doneMsg);
    };

    win.center();
    win.show();
}

// ============================================
// PREVIEW INFO DIALOG
// ============================================

function showPreviewInfo(dpiDrop, orientDrop, fitDrop, bgDrop, marginDrop, saveDrop) {

    var dpiArr = [300, 150, 600, 72];
    var marginArr = [0, 5, 10, 15, 20];
    var dpi = dpiArr[dpiDrop.selection.index];
    var margin = marginArr[marginDrop.selection.index];

    var a4W = 210;
    var a4H = 297;

    if (orientDrop.selection.index === 1) {
        a4W = 297;
        a4H = 210;
    }

    var pxW = Math.round((a4W / 25.4) * dpi);
    var pxH = Math.round((a4H / 25.4) * dpi);

    var marginPx = Math.round((margin / 25.4) * dpi);
    var usableW = pxW - (marginPx * 2);
    var usableH = pxH - (marginPx * 2);

    var infoMsg = "=== A4 Page Preview Info ===\n\n";
    infoMsg += "Page Size       : " + a4W + "mm x " + a4H + "mm\n";
    infoMsg += "Resolution      : " + dpi + " DPI\n";
    infoMsg += "Canvas Size     : " + pxW + " x " + pxH + " pixels\n";
    infoMsg += "Margin          : " + margin + "mm (" + marginPx + "px)\n";
    infoMsg += "Usable Area     : " + usableW + " x " + usableH + " pixels\n";
    infoMsg += "Orientation     : " + orientDrop.selection.text + "\n";
    infoMsg += "Fit Mode        : " + fitDrop.selection.text + "\n";
    infoMsg += "Background      : " + bgDrop.selection.text + "\n";
    infoMsg += "Save Format     : " + saveDrop.selection.text + "\n\n";
    infoMsg += "=== File Size Estimate ===\n";

    if (dpi === 300) infoMsg += "Approx JPEG size: 2-5 MB per image";
    else if (dpi === 600) infoMsg += "Approx JPEG size: 8-15 MB per image";
    else if (dpi === 150) infoMsg += "Approx JPEG size: 0.5-2 MB per image";
    else infoMsg += "Approx JPEG size: 0.2-0.5 MB per image";

    alert(infoMsg);
}

// ============================================
// GET IMAGE FILES
// ============================================

function getImageFiles(folder) {
    var allowed = ["jpg", "jpeg", "png", "tif", "tiff", "bmp", "psd", "webp", "gif"];
    var allFiles = folder.getFiles();
    var result = [];

    for (var i = 0; i < allFiles.length; i++) {
        if (allFiles[i] instanceof File) {
            var nameParts = allFiles[i].name.toLowerCase().split(".");
            var ext = nameParts[nameParts.length - 1];
            for (var j = 0; j < allowed.length; j++) {
                if (ext === allowed[j]) {
                    result.push(allFiles[i]);
                    break;
                }
            }
        }
    }
    return result;
}

// ============================================
// PROCESS SINGLE GEMINI IMAGE
// ============================================

function processGeminiImage(imgFile, outFolder, settings) {

    // --- Calculate A4 dimensions in pixels ---
    var a4W_mm = 210;
    var a4H_mm = 297;

    // Landscape swap
    if (settings.orientation === 1) {
        a4W_mm = 297;
        a4H_mm = 210;
    }

    var a4W_px = Math.round((a4W_mm / 25.4) * settings.dpi);
    var a4H_px = Math.round((a4H_mm / 25.4) * settings.dpi);
    var marginPx = Math.round((settings.margin / 25.4) * settings.dpi);

    // Usable area after margin
    var usableW = a4W_px - (marginPx * 2);
    var usableH = a4H_px - (marginPx * 2);

    // ---- STEP 1: Open Gemini Image ----
    var sourceDoc = app.open(imgFile);
    app.activeDocument = sourceDoc;

    // ---- STEP 2: Convert to RGB if needed ----
    if (sourceDoc.mode !== DocumentMode.RGB) {
        sourceDoc.changeMode(ChangeMode.RGB);
    }

    // ---- STEP 3: Flatten source ----
    sourceDoc.flatten();

    // ---- STEP 4: Enhance the Gemini Image ----
    applyGeminiEnhancements(sourceDoc, settings);

    // ---- STEP 5: Get source dimensions ----
    app.preferences.rulerUnits = Units.PIXELS;
    var srcW = sourceDoc.width.as("px");
    var srcH = sourceDoc.height.as("px");

    // ---- STEP 6: Create A4 Canvas ----
    var a4Doc = createA4Document(a4W_px, a4H_px, settings);

    // ---- STEP 7: Copy source and paste on A4 ----
    app.activeDocument = sourceDoc;
    sourceDoc.selection.selectAll();
    sourceDoc.selection.copy();
    sourceDoc.selection.deselect();

    app.activeDocument = a4Doc;
    var photoLayer = a4Doc.paste();
    photoLayer.name = "Gemini Photo";

    // ---- STEP 8: Position/Fit Image on A4 ----
    fitImageOnA4(photoLayer, usableW, usableH, marginPx, settings.fitMode);

    // ---- STEP 9: Close source doc ----
    sourceDoc.close(SaveOptions.DONOTSAVECHANGES);

    // ---- STEP 10: Flatten A4 ----
    a4Doc.flatten();

    // ---- STEP 11: Save ----
    var baseName = imgFile.name.replace(/\.[^\.]+$/, "");
    var suffix = settings.addSuffix ? "_A4" : "";
    saveA4File(a4Doc, outFolder, baseName + suffix, settings.saveFormat);

    // ---- STEP 12: Close A4 doc ----
    a4Doc.close(SaveOptions.DONOTSAVECHANGES);
}

// ============================================
// APPLY GEMINI IMAGE ENHANCEMENTS
// ============================================

function applyGeminiEnhancements(doc, settings) {

    app.activeDocument = doc;

    // 1. Auto Levels - Fix tonal range
    if (settings.autoLevels) {
        try { doc.autoLevels(); } catch(e) {}
    }

    // 2. Auto Contrast - Improve contrast
    if (settings.autoContrast) {
        try { doc.autoContrast(); } catch(e) {}
    }

    // 3. Auto Color - Fix color cast
    if (settings.autoColor) {
        try { doc.autoColor(); } catch(e) {}
    }

    // 4. Brightness / Contrast
    if (settings.brightness) {
        try {
            var bcDesc = new ActionDescriptor();
            var bcRef = new ActionReference();
            bcRef.putProperty(charIDToTypeID('AdjL'), charIDToTypeID('BrgC'));
            bcDesc.putReference(charIDToTypeID('null'), bcRef);
            var bcAdj = new ActionDescriptor();
            bcAdj.putInteger(charIDToTypeID('Brgh'), 10);
            bcAdj.putInteger(charIDToTypeID('Cntr'), 15);
            bcAdj.putBoolean(stringIDToTypeID('useLegacy'), false);
            bcDesc.putObject(charIDToTypeID('T   '), charIDToTypeID('BrgC'), bcAdj);
            executeAction(charIDToTypeID('Mk  '), bcDesc, DialogModes.NO);
            doc.flatten();
        } catch(e) {}
    }

    // 5. Vibrance - Best for AI color images
    if (settings.vibrance) {
        try {
            var vibDesc = new ActionDescriptor();
            var vibRef = new ActionReference();
            vibRef.putProperty(charIDToTypeID('AdjL'), stringIDToTypeID('vibrance'));
            vibDesc.putReference(charIDToTypeID('null'), vibRef);
            var vibAdj = new ActionDescriptor();
            vibAdj.putInteger(stringIDToTypeID('vibrance'), settings.vibranceAmt);
            vibAdj.putInteger(stringIDToTypeID('saturation'), 0);
            vibDesc.putObject(charIDToTypeID('T   '), stringIDToTypeID('vibrance'), vibAdj);
            executeAction(charIDToTypeID('Mk  '), vibDesc, DialogModes.NO);
            doc.flatten();
        } catch(e) {}
    }

    // 6. Saturation Boost
    if (settings.saturation) {
        try {
            var satDesc = new ActionDescriptor();
            var satRef = new ActionReference();
            satRef.putProperty(charIDToTypeID('AdjL'), charIDToTypeID('HStr'));
            satDesc.putReference(charIDToTypeID('null'), satRef);
            var satAdj = new ActionDescriptor();
            satAdj.putInteger(charIDToTypeID('H   '), 0);
            satAdj.putInteger(charIDToTypeID('Strt'), 20);
            satAdj.putInteger(charIDToTypeID('Lght'), 0);
            satDesc.putObject(charIDToTypeID('T   '), charIDToTypeID('HStr'), satAdj);
            executeAction(charIDToTypeID('Mk  '), satDesc, DialogModes.NO);
            doc.flatten();
        } catch(e) {}
    }

    // 7. Reduce Noise - Clean AI artifacts
    if (settings.noiseReduce) {
        try {
            var noiseDesc = new ActionDescriptor();
            noiseDesc.putInteger(stringIDToTypeID("strength"), 4);
            noiseDesc.putInteger(stringIDToTypeID("colorNoiseReduction"), 30);
            noiseDesc.putInteger(stringIDToTypeID("sharpnessDetail"), 20);
            noiseDesc.putBoolean(stringIDToTypeID("removejpegartifact"), true);
            executeAction(stringIDToTypeID("reducenoise"), noiseDesc, DialogModes.NO);
        } catch(e) {}
    }

    // 8. Smart Sharpen - Make AI images crisp
    if (settings.sharpen) {
        try {
            var sharpDesc = new ActionDescriptor();
            sharpDesc.putEnumerated(
                stringIDToTypeID("presetKind"),
                stringIDToTypeID("presetKindType"),
                stringIDToTypeID("presetKindCustom")
            );
            sharpDesc.putDouble(charIDToTypeID("Amnt"), settings.sharpenAmt);
            sharpDesc.putDouble(charIDToTypeID("Rds "), 1.0);
            sharpDesc.putInteger(charIDToTypeID("Thsh"), 0);
            sharpDesc.putEnumerated(
                stringIDToTypeID("removeType"),
                stringIDToTypeID("removeType"),
                stringIDToTypeID("gaussianBlur")
            );
            sharpDesc.putBoolean(stringIDToTypeID("moreAccurate"), true);
            executeAction(stringIDToTypeID("smartSharpen"), sharpDesc, DialogModes.NO);
        } catch(e) {
            // Fallback to basic sharpen
            try {
                doc.activeLayer.applySharpen();
            } catch(e2) {}
        }
    }
}

// ============================================
// CREATE A4 DOCUMENT
// ============================================

function createA4Document(widthPx, heightPx, settings) {

    var bgColors = [
        [255, 255, 255],   // White
        [220, 220, 220],   // Light Gray
        [100, 100, 100],   // Dark Gray
        [0,   0,   0  ]    // Black
    ];

    var selectedBG = bgColors[settings.background];

    // Create document with white background first
    var newDoc = app.documents.add(
        new UnitValue(widthPx, "px"),
        new UnitValue(heightPx, "px"),
        settings.dpi,
        "A4_Gemini",
        NewDocumentMode.RGB,
        DocumentFill.WHITE,
        1,
        BitsPerChannelType.EIGHT
    );

    // Fill background if not white
    if (settings.background !== 0) {
        var bgColor = new SolidColor();
        bgColor.rgb.red   = selectedBG[0];
        bgColor.rgb.green = selectedBG[1];
        bgColor.rgb.blue  = selectedBG[2];

        app.foregroundColor = bgColor;
        newDoc.selection.selectAll();
        newDoc.selection.fill(app.foregroundColor);
        newDoc.selection.deselect();
    }

    return newDoc;
}

// ============================================
// FIT IMAGE ON A4 PAGE
// ============================================

function fitImageOnA4(layer, usableW, usableH, marginPx, fitMode) {

    app.preferences.rulerUnits = Units.PIXELS;

    var layerW = layer.bounds[2].as("px") - layer.bounds[0].as("px");
    var layerH = layer.bounds[3].as("px") - layer.bounds[1].as("px");

    var scalePercent = 100;

    switch (fitMode) {

        // 0 = Fit to A4 - Keep Ratio (no crop)
        case 0:
            var scaleX = (usableW / layerW) * 100;
            var scaleY = (usableH / layerH) * 100;
            scalePercent = Math.min(scaleX, scaleY);
            layer.resize(scalePercent, scalePercent, AnchorPosition.MIDDLECENTER);
            centerLayer(layer, usableW, usableH, marginPx);
            break;

        // 1 = Fill Full A4 - May Crop
        case 1:
            var scaleX1 = (usableW / layerW) * 100;
            var scaleY1 = (usableH / layerH) * 100;
            scalePercent = Math.max(scaleX1, scaleY1);
            layer.resize(scalePercent, scalePercent, AnchorPosition.MIDDLECENTER);
            centerLayer(layer, usableW, usableH, marginPx);
            break;

        // 2 = Stretch to A4 - Exact fit no crop
        case 2:
            var scaleX2 = (usableW / layerW) * 100;
            var scaleY2 = (usableH / layerH) * 100;
            layer.resize(scaleX2, scaleY2, AnchorPosition.MIDDLECENTER);
            centerLayer(layer, usableW, usableH, marginPx);
            break;

        // 3 = Center Only - Keep original size
        case 3:
            centerLayer(layer, usableW, usableH, marginPx);
            break;
    }
}

// ============================================
// CENTER LAYER ON CANVAS
// ============================================

function centerLayer(layer, usableW, usableH, marginPx) {

    app.preferences.rulerUnits = Units.PIXELS;

    var lW = layer.bounds[2].as("px") - layer.bounds[0].as("px");
    var lH = layer.bounds[3].as("px") - layer.bounds[1].as("px");
    var lX = layer.bounds[0].as("px");
    var lY = layer.bounds[1].as("px");

    var targetX = marginPx + ((usableW - lW) / 2);
    var targetY = marginPx + ((usableH - lH) / 2);

    var moveX = targetX - lX;
    var moveY = targetY - lY;

    layer.translate(new UnitValue(moveX, "px"), new UnitValue(moveY, "px"));
}

// ============================================
// SAVE FILE
// ============================================

function saveA4File(doc, outFolder, baseName, formatIndex) {

    app.activeDocument = doc;
    var filePath;

    switch (formatIndex) {

        // 0 = JPEG Maximum Quality
        case 0:
            filePath = new File(outFolder.fsName + "/" + baseName + ".jpg");
            var jpgMax = new JPEGSaveOptions();
            jpgMax.quality = 12;
            jpgMax.embedColorProfile = true;
            jpgMax.formatOptions = FormatOptions.STANDARDBASELINE;
            jpgMax.matte = MatteType.NONE;
            doc.saveAs(filePath, jpgMax, true, Extension.LOWERCASE);
            break;

        // 1 = JPEG High Quality
        case 1:
            filePath = new File(outFolder.fsName + "/" + baseName + ".jpg");
            var jpgHigh = new JPEGSaveOptions();
            jpgHigh.quality = 10;
            jpgHigh.embedColorProfile = true;
            jpgHigh.formatOptions = FormatOptions.STANDARDBASELINE;
            doc.saveAs(filePath, jpgHigh, true, Extension.LOWERCASE);
            break;

        // 2 = JPEG Medium Quality
        case 2:
            filePath = new File(outFolder.fsName + "/" + baseName + ".jpg");
            var jpgMed = new JPEGSaveOptions();
            jpgMed.quality = 8;
            jpgMed.embedColorProfile = true;
            doc.saveAs(filePath, jpgMed, true, Extension.LOWERCASE);
            break;

        // 3 = PNG Lossless
        case 3:
            filePath = new File(outFolder.fsName + "/" + baseName + ".png");
            var pngOpt = new PNGSaveOptions();
            pngOpt.compression = 0;
            pngOpt.interlaced = false;
            doc.saveAs(filePath, pngOpt, true, Extension.LOWERCASE);
            break;

        // 4 = PDF Print Ready
        case 4:
            filePath = new File(outFolder.fsName + "/" + baseName + ".pdf");
            var pdfOpt = new PDFSaveOptions();
            pdfOpt.pDFCompatibility = PDFCompatibility.PDF15;
            pdfOpt.jpegQuality = 12;
            pdfOpt.embedColorProfile = true;
            pdfOpt.preserveEditing = false;
            pdfOpt.optimizeForWeb = false;
            doc.saveAs(filePath, pdfOpt, true, Extension.LOWERCASE);
            break;

        // 5 = TIFF Uncompressed
        case 5:
            filePath = new File(outFolder.fsName + "/" + baseName + ".tif");
            var tiffOpt = new TiffSaveOptions();
            tiffOpt.imageCompression = TIFFEncoding.NONE;
            tiffOpt.embedColorProfile = true;
            tiffOpt.layers = false;
            doc.saveAs(filePath, tiffOpt, true, Extension.LOWERCASE);
            break;
    }
}

// ============================================
// RUN SCRIPT
// ============================================

try {
    app.preferences.rulerUnits = Units.MM;
    createMainUI();
} catch (mainErr) {
    alert("Script Error!\n\nMessage: " + mainErr.message + "\nLine: " + mainErr.line + "\n\nPlease check Photoshop version and try again.");
}