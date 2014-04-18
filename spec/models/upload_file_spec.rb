require 'spec_helper'

describe UploadFile do
  before(:each) do
    @upload_file = UploadFile.new("file")
  end

  describe '#word_count' do
    it 'returns a hash of the top 25 words and their usage count' do
      file = double(File, read: 'cow Talks cow Cows talking strenuous.')
      File.stub(:open) { |&block| block.yield file }
      expect(@upload_file.word_count).to eq({'cow' => 3, 'talk' => 2, 'strenuous' => 1})
    end
  end
end
