import "outputItemElement";
import validateForm, { FormError } from "validateForm";

// @note I'm hijacking the submission because there's no server.
document.querySelector("form")!.addEventListener("submit", function (event) {
  event.preventDefault();
  try {
    this.error.innerText = "";
    const outputItemElement = document.createElement("output-item");
    outputItemElement.innerText = JSON.stringify(validateForm(this));
    this.data.append(outputItemElement);
    this.reset();
  } catch (error) {
    if (error instanceof FormError) this.error.innerText = error.message;
    else this.error.innerText = "Unexpected error.";
  }
});
