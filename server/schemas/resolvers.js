// Import necessary modules and dependencies
const { User } = require('../models'); // Replace with your user model import
const bcrypt = require('bcrypt'); // For password hashing
const { signToken } = require('../utils/auth'); //import to create token

const resolvers = {

    Query:{
        getUsers : async () => {
            try {
                const users = await User.find();
                return users;
            }catch (error){
                throw new Error(`Failed To Retrieve Users: $(error.message)`)
            }
        },

        getSingleUser : async (_, { id, params }) => {
            try {
              const userId = id || (params && params.id);

              if (!userId) {
                // Handle the case where neither `id` nor `params.id` is provided.
                return null;
              }

                const user = await User.findById(userId);
                return user || null;
            } catch (error) {
                throw new Error(`Failed To Retrieve Users: $(error.message)`)
            }
        },
        searchGoogleBooks: async (_, { query }) => {
          try {
            // Perform the asynchronous fetch operation to the Google Books API
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch data from Google Books API: ${response.statusText}`);
            }
            const data = await response.json();
            const items = data.items || [];
            
            // Map the retrieved data to the custom Book type
            const books = items.map((item) => ({
              id: item.id,
              title: item.volumeInfo.title,
              subtitle: item.volumeInfo.subtitle,
              authors: item.volumeInfo.authors || [],
              publishedDate: item.volumeInfo.publishedDate,
              description: item.volumeInfo.description,
              image: item.volumeInfo.previewLink || null, // Add thumbnail
            }));
    
            return books;
          } catch (error) {
            console.error(error);
            throw new Error('An error occurred while fetching data from Google Books API.');
          }
        },
        
    },
    Mutation:{
        createUser : async (_, args) => {
            try {
              // Destructure the input arguments
              const { username, email, password } = args;
    console.log(args);          
              // Check if a user with the same email or username already exists
              const existingUser = await User.findOne({ $or: [{ email }, { username }] });
          
              if (existingUser) {
                throw new Error('User with the same email or username already exists.');
              }
          
              // Create a new user object
              const newUser = new User({
                username,
                email,
                password,
              });
    console.log(newUser)      
              // Save the user object to the database
              const savedUser = await newUser.save();

              const token = signToken(savedUser);

              const authResponse = {
                user: savedUser,
                token,
              };
          
              // Return the AuthResponse
              return authResponse;
            //return (token, savedUser);
            } catch (error) {
              throw new Error(`Failed to create user: ${error.message}`);
            }
          },
          login: async (_, args) => {
            try {
              const { username, email, password } = args;
    console.log(args);      
              // Find the user by either username or email
              const user = await User.findOne({ $or: [{ username }, { email }] });
    console.log(user);      
              if (!user) {
                throw new Error("User Not Found");
              }
          
              // Verify the password
              const passwordMatch = await bcrypt.compare(password, user.password);
          
              if (!passwordMatch) {
                throw new Error("Wrong Password!");
              }
          
              // Generate an authentication token
              const token = signToken(user);
          
              const authResponse = {
                user,
                token,
              };
          
              return authResponse;
            } catch (error) {
              throw new Error(`Failed To Locate User : ${error.message}`);
            }
          },          
    } 
}


// Export the resolvers as an object
module.exports = resolvers;
