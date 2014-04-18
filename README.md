#Word Frequency Application

###This is a rails app takes a .txt file from a user and provides the top 25 most used words in a d3 chart.

##Gems
The below gems were used for testing.
```
  gem 'rspec-rails', '~> 2.14.2'
  gem 'capybara', '~> 2.2.1'
  gem 'selenium-webdriver', '~> 2.41.0'
```
##Approach
I wanted to demonstrate I could write a basic rails application with some testing.  This is a one page app with only two routes and one model.

###Model
The lone model is UploadFile.  Instances of UploadFile are created with the user's provided text file.  The method #word_count parses the file's contents and counts the number of times the word is used.  The word stems are found using regular expressions.

###Routes
There is just the root page and a route ('/word_count') against which the user's uploaded file is posted.

###Controller
There is just one controller method (#word_count), which returns a json of the top 25 words in the uploaded file.  The index method does not need to be defined because the index view has no dependent model data initially.

###Javascript
On the front end, I used ajax to submit the file.  Upon a successful return, the Javascript draws the graph using the d3 library.
