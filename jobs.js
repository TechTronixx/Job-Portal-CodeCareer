const filterButton = document.querySelector("#filter");
const keywordsInput = document.querySelector("#keywords");

// Fetch JSON data from an API endpoint or a local file
fetch("jobs-data.json")
  .then((response) => response.json())
  .then((data) => {
    // Get the element where the job listings will be displayed
    const jobList = document.getElementById("featured-jobs-list");

    // Add event listener to the filter button
    filterButton.addEventListener("click", (event) => {
      event.preventDefault();
      let filteredJobs = data.jobs;
      // Get the keywords entered in the form
      let keywords = keywordsInput.value.toLowerCase().split(",");
      if (keywords.length > 0) {
        // Filter the jobs based on the keywords
        filteredJobs = filteredJobs.filter((job) => {
          return keywords.some(
            (keyword) =>
              job.title.toLowerCase().includes(keyword) ||
              job.location.toLowerCase().includes(keyword) ||
              job.type.toLowerCase().includes(keyword) ||
              job.description.toLowerCase().includes(keyword)
          );
        });
      }
      // Clear the existing job listings
      jobList.innerHTML = "";
      // Loop through the filtered jobs and create an HTML element for each job listing
      filteredJobs.forEach((job) => {
        const jobItem = document.createElement("li");
        jobItem.innerHTML = `
            <h3>${job.title}</h3>
            <p>Location: ${job.location}</p>
            <p>Type: ${job.type}</p>
            <p>${job.description}</p>
            <a class="apply-button" href="${job.apply_url}">Apply Now</a>
          `;
        jobList.appendChild(jobItem);
      });
    });
  })
  .catch((error) => console.error(error));
