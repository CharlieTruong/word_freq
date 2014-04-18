require 'spec_helper'

describe UploadFilesController, :type => :controller do
  describe "GET upload_files#index" do
    it "renders the :index template for the upload file" do
      get :index
      expect(response).to render_template :index
    end
  end

  describe "POST upload_files#word_count" do
    it "returns a json of the top 25 words in the uploaded text file" do
      upload_file = double(UploadFile, word_count: {'hello' => 2, 'world' => 1})
      UploadFile.stub(:new) {upload_file}
      post :word_count, file: 'file'
      expect(response.body).to eq({'hello' => 2, 'world' => 1}.to_json)
    end
  end
end
