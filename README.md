
# `Documentation`

<p align="center">
  <img src=client\src\assets\images\logo.png width="250" title="hover text">
</p>

>Cookie Monster website is here to sell you decorated cookies. Its pages are as below. A page for the Home, Store - which can also be opened by categories, Videos, About, Shopping cart, Shipping, Payment form, Faq-frequently asked questions, and Previous Orders. Additionally, there is a sign-up form and a login form to the site.

**`Important`: in order to use this app you must run the following in 2 different terminals open by the path ..\cookie monster:**

in 1 terminal:
* cd api
* npm install
* npm start

in the other:
* cd client
* npm install
* npm start 

**About this project:**
  The client side was done for the final project of last semesters' web course. The server side is written now for this semesters' final project in webServer course - which includes writing a server side in nodejs, and using the mongodb as a database.

-------------------------------------------
The application contains a header and footer toolbar that can navigate between the pages. It is also possible to get to the pages by using links:
* **Home** - http://localhost:3000/ 
* **Shop** (All items) - http://localhost:3000/AllItems 
* **Shop** (baby cookies) - http://localhost:3000/AllItems/Babies 
* **Shop** (birthday cookies) - http://localhost:3000/AllItems/Birthdays 
* **Shop** (present cookies) - http://localhost:3000/AllItems/Presents 
* **Shop** (other cookies) - http://localhost:3000/AllItems/Others 
* **About us** - http://localhost:3000/about 
* **Videos** - http://localhost:3000/allVideos 
* **Shopping Cart** - http://localhost:3000/ShoppingCart 
* **Checkout** - http://localhost:3000/checkout 
* **Privacy policy** - http://localhost:3000/privacyPolicy 
* **Terms and Conditions** - http://localhost:3000/termsAndConditions 
* **Faq** - http://localhost:3000/faq 
* **Previous orders** - http://localhost:3000/previousOrders 
----------------------------------------------
**The website uses the following components**:
> *Most of the following Components receive the currentUser as props which is stored in the local storage and use its information when needed.*

1. **Header** -as explained above, and a login or sign-up button when not signed in or a sign-out button. (I will explain the forms later).
2. **Footer** – as explained above.
3. **Home** – has a carousel with pictures – by using the:

3. **Carousal** - component for the user, and has buttons to bring the user to the types of cookies and to the videos.

4. **About** – displays a short paragraph about the website.

5. **FormTextBox** – receives: className, label, type, name, value, onchange, small as props, and displays an input field in the form – according to the props received.

6. **Register** – a form to sign-up to our website, which contains the following fields:
    - *name* – is valid if the name is in between 2 and 20 letters in the ABC alphabet.
    - *Id* – is valid if it contains exactly 9 digits where the last digit is valid (only Israeli ids are valid).
    - *Email* – is valid if email is in the form of: exampleEmail@example.com.
    - *Password* - is valid if it contains at least 8 characters including at least one digit, lowercase, and uppercase letter.
    - *Confirmation password* - is valid if matches password, and passes password validation.

7. **SignIn**  – a form to login to the users account, which contains the following fields:
    - *Email* – is valid if email is in the form of: exampleEmail@example.com.
    - *Password* - is valid if it contains at least 8 characters including at least one digit, lowercase, and uppercase letter.


All the validations above are done by the Validation.js file(in the shared folder).In addition, all of the above fields are required. When all fields are valid and not empty, after the user logs in – it is known in the whole website and his name will appear on the header, in addition if the user is a new user, it will receive a welcome email to his inbox. (The user does not have to sign-up or login to buy from the website.)

9. **ItemInfo** – receives:  image, name, price, and inCart as props, and displays an enlarged item from the store. If inCart is true there will be a button to remove the item from cart otherwise there will be a button to add the item to cart.
10. **Item** – receives: image, name, id, and price as props, and displays an item in the store – according to the props received. It has an add-to-cart button, and when added a toast notification notifies the user that it added an item to the cart. In addition, when pressing on the item a modal opens showing the item enlarged – by calling the ItemInfo component. 
11. **AllItems** – Fetches from the Items.json file all the stores’ items and calls the Item component to display all the items. If it received a category as props only the items having that category will be displayed.
12. **ShoppingCartItem** -  receives: image, name, id, and price as props, and displays an item from the shopping cart. There’s an option to remove the item from the cart and to change the quantity of the items. When pressing the image of the item an enlarged image of the item opens up on a modal  - by calling the ItemInfo component. 
13. **ShoppingCart** – Fetches the users shopping cart items from the DataBase and calls the ShoppingCartItem to display them onto the page.\
There is an option to choose when the order should be delivered, and the total amount of order is displayed too. A proceed to checkout button which take the user to the Checkout page:
14. **PayPal** – receives the total of the order, and charges the user’s order through paypal.
15. **Checkout** – has 2 options of payment PayPal or credit card. The payment form has the following fields:
    - *name* – is valid if the name is in between 2 and 20 letters in the ABC alphabet.
    - *Phone number* – is valid if number is in between 7 and 10 digits.
    - *Shipping/Billing address* – is valid if it has a number and street name.
    - *City*(+State) – is valid if it contains a proper city/state.
    - *Country* – a list of all countries are fetched from the json file and displayed for the user to select a country.
    - *Credit card number* – is valid if the number is a correct number of one of the following cards:
Visa, MasterCard, American Express, Diners Club, Discover, and JCB.
    - *Expiration date* – is valid if the date is not expired.
    - *Security number* – is valid if it's 3 or 4 digits. 

*All the above validations are performed by the Validation file, as mentioned above.*

After the user correctly pays a confirmation email is sent to its inbox.

16. **PlayVideo** – receives a url as props and displays a video.
17. **AllVideos** - Fetches the videos from the json file and calls PlayVideo component to display each video.
18. **PrivacyPolicy** – displays the site privacy policy.
19. **TermsOfService** – displays the sites terms of service.
20. **NotFound** – displays Error 404 page not found for any page that doesn’t exist on the website.
21. **Faq** – Provides answers for frequently asked questions and has an option of submitting another question.
22. **PreviousOrder** – displays an order of users’ previous orders.
23. **PreviousOrders** – by calling PreviousOrder, displays all of the users’ previous orders. Obviously, if there are no orders (or the user is not signed in) there will be a notice saying that there are no previous orders. 
------------------------------------------------
### `I hope you enjoy this website as many hours and effort went into building it.`

<p align="center">
  <img src="client\public\favicon.ico" width="150" title="hover text">
</p>

## Here's a sneak peek at the website:
<p align="center">
  <img src="Cookie Monster video (1).gif" title="hover text">
</p>
