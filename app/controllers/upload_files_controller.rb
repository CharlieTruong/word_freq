class UploadFilesController < ApplicationController
  def index
  end

  def word_count
    file = UploadFile.new(params['file'].tempfile)
    top25_words = file.word_count
    render json: top25_words
  end
end