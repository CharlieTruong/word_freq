require 'spec_helper'

describe UploadFile do
  before(:each) do
    @upload_file = UploadFile.new("file")
  end

  describe '#word_count' do
    it 'returns a hash of the top 25 words and their usage count' do
      file = double(File, read: 'the cow talks to other cows when they talked.')
      File.stub(:open) { |&block| block.yield file }
      expect(@upload_file.word_count).to eq({'cow' => 2, 'talk' => 2, 'to' => 1, 'other' => 1, 'when' => 1, 'they'=> 1, 'the' => 1})
    end
  end
end
