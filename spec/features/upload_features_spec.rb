require 'spec_helper'

describe 'Upload Features', :js => true do 
  describe 'the upload form' do
    it 'contains a form with file input' do
      visit '/'
      expect(page).to have_css('input[type="file"]')
    end

    it 'the button to upload the selected file is initially disabled' do
      visit '/'
      expect(find_button('Upload', disabled: true)[:disabled]).to eq("true")
    end

    it 'only allows a .txt file extension' do
      visit '/'
      attach_file('file',File.join(Rails.root,'spec','test_upload_files','bad_file.gif'))
      message = page.driver.browser.switch_to.alert.text
      page.driver.browser.switch_to.alert.accept
      expect(message).to eq('Please provide a plain text file')
    end

    it 'enables the submit button when the user selects a plain text file' do
      visit '/'
      attach_file('file',File.join(Rails.root,'spec','test_upload_files','good_file.txt'))
      expect(find_button('Upload')[:disabled]).to eq(nil)
    end

    it 'displays a svg graph when the user uploads a plain text file' do
      visit '/'
      attach_file('file',File.join(Rails.root,'spec','test_upload_files','good_file.txt'))
      find_button('Upload').click
      active = page.evaluate_script('jQuery.active')
      until active == 0
        active = page.evaluate_script('jQuery.active')
      end
      expect(page).to have_css('svg')
    end
  end
end