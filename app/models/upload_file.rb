class UploadFile
  def initialize(text_file)
    @text_file = text_file
  end

  def word_count 
    freq = Hash.new
    
    File.open(@text_file, 'r') do |file|
      freq = count(freq, file)
    end
    
    freq = freq.sort_by{|word, count| count}.reverse.take(25)
    Hash[freq]
  end

  private

  def count(hash, file)
    file.read.split(/\s+|\n+|\t+|\r+|'+|"+/).each do |word|
      word = stem(word).downcase
      if (word != "")
        hash[word].nil? ? hash[word] = 1 : hash[word] += 1
      end
    end
    hash
  end

  def stem(word)
    word.gsub(/ed[[:punct:]]*\b|([^aiu])s[[:punct:]]*\b|ing[[:punct:]]*\b|[[:punct:]]/i,'\1')
  end
end