class TextMessage

  def self.send_location_info(args)
    args[:address]      ||= "123 Fake Street"
    args[:phone_number] ||= "8044092760"
    args[:place]        ||= "Taco Bell"
    phone_number  = args[:phone_number]
    place         = args[:place]
    address       = args[:address]

    auth_token= '20628bbc0562604a69b293021c5ea449' 
    account_sid= 'ACa74b8ecd81921f324b3e11d0dc0fa601'
    @client = Twilio::REST::Client.new account_sid, auth_token
    
    signature   = "- Courtesy of Middle.Place"
    message = "#{place} \n #{address} \n #{signature}"

    @client.account.messages.create(
      :body => message,
      :to   => phone_number,
      :from => "+18044092760"
    )
  end

end
