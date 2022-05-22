# Design
### Ui
Based on this [template](https://www.figma.com/file/gKZoWoleFgP35xvYu83Y2l/Portfolio-UI---Web-%26-Mobile?node-id=138%3A70)

Light mode colors:
- background-color: #E5E5E5
- accent-color: #7b39ed

Dark mode colors:
- background-color: #333333
- accent-color: #7b39ed
---
### Database
Biggest consideration on deciding on a database structure is of course its usage and how frequently we want that data.
We could have two approaches when it comes to how we want to model our data:

Because it is a MongoDB style noSQL database: we could easily just store all of our *Users* **inside** each Chirp.
- Positives:
    - On Main page its very easy to just fetch all Chirps
    - No second fetch to get users who are associated with the Chirp
- Negatives:
    - Duplicate data --- Not that big of a deal, storage is cheap
    - Updating the profilepic of User would require updating all Chirps

But I think the negatives outway the positives and I don't think a second fetch would inpact the performance too much. Of course that can easily be tested.

That is why I will go with a normalized datastructure:
- users -- document
    - userID
        - amountOfChirps
        - chirps: \[chirpID,\]
        - pic -- Profile picture
        - username
        - chirpHandle
- chirps
    - chirpID
        - user: userID
        - textContent
        - imgContent: \[img_url,\]
        - timestamp