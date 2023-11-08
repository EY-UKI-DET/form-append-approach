const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("data-form");
  const dataList = document.getElementById("data-list");
  const errorContainer = document.getElementById("error-container");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous error messages
    errorContainer.innerHTML = "";

    // Get form input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value;

    // Custom validation for name
    if (!/^[A-Za-z\s]+$/.test(name)) {
      showError("name", "Please enter a valid name containing only letters.");
      return;
    }

    // Custom validation for email
    if (!isValidEmail(email)) {
      showError("email", "Please enter a valid email address.");
      return;
    }

    // Custom validation for date of birth
    if (!isValidDate(dob)) {
      showError("dob", "Please enter a valid date of birth.");
      return;
    }

    // Custom validation for phone number
    if (!/^\d{10}$/.test(phone)) {
      showError("phone", "Please enter a valid 10-digit phone number.");
      return;
    }

    // Create a new data item
    const dataItem = document.createElement("li");
    dataItem.innerHTML = `
          <span>Name: ${name}, Email: ${email}, Date of Birth: ${dob}, Phone: ${phone}</span>
          <button class="remove-button">Remove</button>
      `;

    // Add the data item to the list
    dataList.appendChild(dataItem);

    // Clear the form
    form.reset();

    // Add a click event listener to the remove button
    const removeButton = dataItem.querySelector(".remove-button");

    if (removeButton) {
      removeButton.addEventListener("click", function () {
        dataList.removeChild(dataItem);
      });
    }
  });

  // Function to display error messages
  function showError(field, message) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = message;
    errorContainer.appendChild(errorElement);

    // Focus on the input field with an error
    document.getElementById(field).focus();
  }
});
