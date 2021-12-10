const { Console } = require('console')
const fs = require('fs')
const path = require('path')



function fileSort(fileExtension) {
    const doc_types = [".doc", ".docx", ".txt", ".pdf", ".xls", ".ppt", ".xlsx", ".pptx"];
    const img_types = [".jpg", ".jpeg", ".png", ".svg", ".gif", ".tif", ".tiff"];
    const mod_types = [".rar", ".7z", ".zip"];
    const software_types = [".exe", ".pkg", ".dmg"];

    //note that indexOf returns the index position
    //checking if the index of the file extension exists if it exists in the rray the index is either 0 or above
    if (doc_types.indexOf(fileExtension) >= 0) {
        return "doc"
    } else if (img_types.indexOf(fileExtension) >= 0) {
        return "img"
    } else if (mod_types.indexOf(fileExtension) >= 0) {
        return "zips"
    } else if (software_types.indexOf(fileExtension) >= 0) {
        return "soft"
    }


}

//path.dirname used to get parent folder
//__dirname gives directory of script 
const folderPath = path.dirname(__dirname) + '/' //'/Users/Admin/Downloads/'

const directories = [folderPath + "Documents/", folderPath + "Images/", folderPath + "Compressed/", folderPath + "Software/"]

//check if folder already exists
for (let j = 0; j < directories.length; j++) {
    fs.access(directories[j], (err) => {
        if (err) {
            //create a folder if the directory does not exist
            fs.mkdir(directories[j], (err) => {
                if (err) {
                    console.error(err);

                }
                console.log("Created directory: " + directories[j])
            })
        }
        console.log(directories[j] + "already exists")
    })
}



//reading directory with asynchronous method
fs.readdir(folderPath, (err, files) => {

    //callback
    if (err) return console.error(err)

    //files is an array that has all the files in the directory not including the directory itself
    //console.log(files.join(' '))
    for (let i = 0; i < files.length; i++) {

        var fileExt = path.extname(folderPath + files[i])

        //switch case for renaming the file path
        switch (fileSort(fileExt)) {
            case 'doc':
                fs.rename(path.join(folderPath, files[i]), path.join(directories[0] + files[i]), (err) => {
                    if (err) {
                        console.error(err)
                    }
                    console.log(files[i] + ' moved to Documents')
                })
                break;
            case 'img':
                fs.rename(path.join(folderPath, files[i]), path.join(directories[1] + files[i]), (err) => {
                    if (err) {
                        console.error(err)
                    }
                    console.log(files[i] + ' moved to Images')
                })
                break;
            case 'zips':
                fs.rename(path.join(folderPath, files[i]), path.join(directories[2] + files[i]), (err) => {
                    if (err) {
                        console.error(err)
                    }
                    console.log(files[i] + ' moved to Compressed')
                })
                break;
            case 'soft':
                fs.rename(path.join(folderPath, files[i]), path.join(directories[3] + files[i]), (err) => {
                    if (err) {
                        console.error(err)
                    }
                    console.log(files[i] + ' moved to Softwares')
                })
                break;


        }



    }


})

