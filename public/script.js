// Wait for the DOM to be fully loaded


document.addEventListener("DOMContentLoaded", function () {

    // Get the submit button element
    const submitBtn = document.getElementById("submitBtn");
    const loadBtn = document.getElementById("loadBtn");

    // const element = document.getElementById("id01");
    // element.innerHTML = 123.2;

    loadBtn.addEventListener("click", function () {
        const id = document.getElementById("id").value;
        console.log(id)

        fetch("https://raw.githubusercontent.com/phawitb/HT-Army2024/main/config.txt")
        .then(response => response.text())
        .then(data => {
            
            d = data.split('\n')
            var data_dict = {};
            for (let i = 0, len = d.length, text = ""; i < len; i++) {
                dd = d[i].split(',')
                if(dd.length == 7){
                    // console.log(dd)
                    data_dict[dd[0]] = {
                        adj_temp : dd[1],
                        adj_humid : dd[2],
                        adj_pm25 : dd[3],
                        line1 : dd[4],
                        line2 : dd[5],
                        line3 : dd[6]
                    }
                }
            old_data = data_dict;
                
            }
            console.log(data_dict)
            console.log(data_dict[id])
            // console.log(123)
            document.getElementById("adj_temp").value = data_dict[id]['adj_temp'];
            document.getElementById("adj_humid").value = data_dict[id]['adj_humid'];
            document.getElementById("adj_pm25").value = data_dict[id]['adj_pm25'];
            document.getElementById("line1").value = data_dict[id]['line1'];
            document.getElementById("line2").value = data_dict[id]['line2'];
            document.getElementById("line3").value = data_dict[id]['line3'];
            document.getElementById("status").innerHTML = "";

            console.log(document.getElementById('submitBtn').style.display)
            if (!document.getElementById('submitBtn').style.display) {
                document.getElementById('H0').style.display = 'block';
                document.getElementById('H1').style.display = 'block';
                document.getElementById('H2').style.display = 'block';
                document.getElementById('H3').style.display = 'block';
                document.getElementById('H4').style.display = 'block';
                document.getElementById('H5').style.display = 'block';
                document.getElementById('adj_temp').style.display = 'block';
                document.getElementById('adj_humid').style.display = 'block';
                document.getElementById('adj_pm25').style.display = 'block';
                document.getElementById('line1').style.display = 'block';
                document.getElementById('line2').style.display = 'block';
                document.getElementById('line3').style.display = 'block';
                document.getElementById('submitBtn').style.display = 'block';
              }
        
            // element.innerHTML = parseFloat(data_dict[id]['adj_temp']);          

        })
        .catch(error => {
            console.error("Error retrieving data:", error);
            document.getElementById("status").innerHTML = "ID not exist!";
        });


    });

    // Handle button click
    submitBtn.addEventListener("click", function () {
        //get old_data---------------------
        fetch("https://raw.githubusercontent.com/phawitb/HT-Army2024/main/config.txt")
        .then(response => response.text())
        .then(data => {
            // Use the data here
            // console.log(data.split('\n'));
            d = data.split('\n')
            var data_dict = {};
            for (let i = 0, len = d.length, text = ""; i < len; i++) {
                dd = d[i].split(',')
                if(dd.length == 7){
                    // console.log(dd)
                    data_dict[dd[0]] = {
                        adj_temp : dd[1],
                        adj_humid : dd[2],
                        adj_pm25 : dd[3],
                        line1 : dd[4],
                        line2 : dd[5],
                        line3 : dd[6]
                    }
                }
            old_data = data_dict;
                
            }
            
        })
        //create content---------------------
        const id = document.getElementById("id").value;
        const adj_temp = document.getElementById("adj_temp").value;
        const adj_humid = document.getElementById("adj_humid").value;
        const adj_pm25 = document.getElementById("adj_pm25").value;
        const line1 = document.getElementById("line1").value;
        const line2 = document.getElementById("line2").value;
        const line3 = document.getElementById("line3").value;
        console.log(id)
        console.log(adj_temp)
        console.log(adj_humid)
        
        old_data[id]['adj_temp'] = adj_temp;
        old_data[id]['adj_humid'] = adj_humid;
        old_data[id]['adj_pm25'] = adj_pm25;
        old_data[id]['line1'] = line1;
        old_data[id]['line2'] = line2;
        old_data[id]['line3'] = line3;
        console.log(old_data);
        console.log(Object.keys(old_data));
        d = Object.keys(old_data);
        var content = '';
        for (let i = 0, len = d.length, text = ""; i < len; i++){
            console.log(d[i])
            console.log(old_data[d[i]]['adj_temp'])
            console.log(old_data[d[i]]['adj_humid'])
            console.log(old_data[d[i]]['adj_pm25'])
            console.log(old_data[d[i]]['line1'])
            console.log(old_data[d[i]]['line2'])
            console.log(old_data[d[i]]['line3'])
            if(i==0){
                content += d[i] + ',' + old_data[d[i]]['adj_temp'] + ',' + old_data[d[i]]['adj_humid'] + ',' + old_data[d[i]]['adj_pm25'] + ',' + old_data[d[i]]['line1']+ ',' + old_data[d[i]]['line2']+ ',' + old_data[d[i]]['line3'];
            }
            else{
                content += '\n' + d[i] + ',' + old_data[d[i]]['adj_temp'] + ',' + old_data[d[i]]['adj_humid'] + ',' + old_data[d[i]]['adj_pm25'] + ',' + old_data[d[i]]['line1']+ ',' + old_data[d[i]]['line2']+ ',' + old_data[d[i]]['line3'];
            }
        }
        console.log(content)

        //update data---------------------
        // User input values
        const token = "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";
        const owner = "phawitb";
        const repo = "HT-Army2024";
        const filePath = "config.txt";
        // const content = "NEW_FILE_CONTENT";

        // Retrieve the existing file content
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.content) {
                // Decode the base64 encoded content
                const existingContent = atob(data.content);

                // Modify the existing content
                // const updatedContent = existingContent + "\n" + content;
                const updatedContent = content;

                // Prepare the request payload
                const payload = {
                    message: "Update file",
                    content: btoa(updatedContent), // Encode the updated content as base64
                    sha: data.sha // Include the file's current SHA
                };

                // Send the update request
                fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.content) {
                        console.log("File updated successfully!");
                        document.getElementById("status2").innerHTML = "updated successfully!";
                    } else {
                        console.log("File update failed!");
                        document.getElementById("status2").innerHTML = "update failed!";
                    }
                })
                .catch(error => console.error("Error:", error));
            } else {
                console.log("File not found!");
                document.getElementById("status2").innerHTML = "File not found!";
                
            }
        })
        .catch(error => console.error("Error:", error));
        document.getElementById("status2").innerHTML = "waiting..";


    });
});






// const username = 'phawitb';
// const repoName = 'HT-Army2024';
// const filePath = 'config.txt';
// const token = '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';
// const updatedContent = 'Updated content for config.txt';

// // Step 1: Retrieve the current file details, including the SHA hash
// fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`, {
//   method: 'GET',
//   headers: {
//     'Authorization': `token ${token}`,
//   },
// })
// .then(response => response.json())
// .then(data => {
//   // Step 2: Extract the current SHA hash from the response
//   const currentSha = data.sha;

//   // Step 3: Update the file with the correct SHA hash
//   fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`, {
//     method: 'PUT',
//     headers: {
//       'Authorization': `token ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       message: 'Update config.txt',
//       content: btoa(updatedContent), // Content needs to be Base64 encoded
//       sha: currentSha, // Use the current SHA hash
//     }),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data); // Updated file data
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// })
// .catch(error => {
//   console.error('Error:', error);
// });
