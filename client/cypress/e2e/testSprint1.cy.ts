// Unit Test (Sprint2) -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

describe('US9: ผู้ใช้ต้องตั้ง Password เพื่อการ login ครั้งต่อไปด้วย Username เดิม', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('TC1: หาก username และ password ตั้งถูกต้องตามเงื่อนไข จะสามารถกดเข้าสู่หน้าต่อไปได้ หากกด logout แล้วเข้าด้วย username และ password เดิมจะสามารถเข้าสู่บัญชีเดิมได้', () => {
    const validUsername = 'test123';
    const validPassword = 'test123';
    const validTell = 'tell';
    const validEmotion = 'Joy';

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion}"]`).click();

    cy.get('button[name="Go"]').click();

    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);

    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();
    cy.url().should('include', '/login');

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion}"]`).click();

    cy.get('button[name="Go"]').click();

    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);

    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();

  })

  it('TC2: หากกรอก username ถูกต้องตามเงื่อนไข แต่ password ไม่ถูกต้องตามเงื่อนไข จะไม่สามารถกดเข้าสู่หน้าต่อไปได้ และขึ้นแจ้งเตือนเงื่อนไขที่ถูกต้อง', () => {
    const validUsername = 't1';
    const invalidPassword1 = 'test 123';
    const invalidPassword2 = 'test12345678910';
    const invalidPassword3 = 'test';
    const validTell = 'tell';
    const validEmotion = 'Joy';

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(invalidPassword1);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('not.include', '/home');
    cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    cy.contains('Password must contain only alphabet, number, Thai, @, _ and not less than 6 not exceed 13 characters.', { timeout: 4000 }).should('be.visible');

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(invalidPassword2);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('not.include', '/home');
    cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    cy.contains('Password must contain only alphabet, number, Thai, @, _ and not less than 6 not exceed 13 characters.', { timeout: 4000 }).should('be.visible');

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(invalidPassword3);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('not.include', '/home');
    cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    cy.contains('Password must contain only alphabet, number, Thai, @, _ and not less than 6 not exceed 13 characters.').should('be.visible');

  })

  it('TC3: หาก username และ password ตั้งถูกต้องตามเงื่อนไข จะสามารถกดเข้าสู่หน้าต่อไปได้ หากกด logout แล้วเข้าด้วย username เดิม แต่ password ผิดจะไม่สามารถเข้าสู่ระบบได้ และขึ้นแจ้งเตือนให้กรอกใหม่อีกครั้ง', () => {
    const validUsername = 'test1234';
    const validPassword = 'test1234';
    const invalidPassword = 'test12345';
    const validTell = 'tell';
    const validEmotion = 'Joy';

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion}"]`).click();

    cy.get('button[name="Go"]').click();

    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);

    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();
    cy.url().should('include', '/login');
    
    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(invalidPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion}"]`).click();

    cy.get('button[name="Go"]').click();

    cy.url().should('not.include', '/home');
    cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    cy.contains('This username is already in use. Or please enter your password again.').should('be.visible');

  })
})







describe('US4: แสดงสถานะแถบสีของอารมณ์ของผู้ใช้', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('TC1: ปุ่มอารมณ์ทุกสีสามารถกดได้ และเมื่อกดเลือกสีอารมณ์แต่ละอันแล้วต้องแสดงสีอารมณ์นั้นที่ด้านข้างชื่อผู้ใช้งาน', () => {
    const validUsername = 'test12345';
    const validPassword = 'test12345';
    const validTell = 'tell';
    const validEmotion1 = 'Joy';
    const validEmotion2 = 'Sadness';
    const validEmotion3 = 'Disgust';
    const validEmotion4 = 'Fear';
    const validEmotion5 = 'Anger';

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion1}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();


    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion2}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();


    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion3}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();


    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion5}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();


    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion1}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();
  })


  it('TC2: เมื่อเพื่อนเลือกสีอารมณ์เข้ามา ต้องแสดงสีอารมณ์นั้นที่หน้าhomeของผู้ใช้', () => {
    const validUsernameMe = 'me';
    const validPasswordMe = '123456';
    const validEmotionMe = 'Joy';
    const validTell = 'tell';
    const validUsernameFriend = 'friend';
    const validPasswordFriend = '123456';
    const validEmotionFriend = 'Sadness';

    cy.get('input[name="username"]').type(validUsernameFriend);
    cy.get('input[name="password"]').type(validPasswordFriend);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotionFriend}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsernameFriend)}`);
    
    
    cy.visit('http://localhost:3000');
    cy.get('input[name="username"]').type(validUsernameMe);
    cy.get('input[name="password"]').type(validPasswordMe);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotionMe}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsernameMe)}`);
    cy.get('button[name="friends"]').click();
    cy.get('.bg-blue-500').should('be.visible');
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();

  })

  it('TC3: หากผู้ใช้ไม่เลือกสี จะไม่สามารถไปหน้าต่อไปได้ และแจ้งเตือนต้องเลือกสีอารมณ', () => {
    const validUsername = 'test123456';
    const validPassword = 'test123456';
    const validTell = 'tell';

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get('button[name="Go"]').click();
    cy.url().should('not.include', '/home');
    cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    cy.contains('Please select an emotion.').should('be.visible');

  })
})






describe('US5: ผู้ใช้สามารถใส่ข้อความแสดงสิ่งที่อยากบอกกับผู้ใช้คนอื่นได้ในหน้าlogin', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('TC1: หากกรอกข้อความเกิน 60 ตัวอักษร จะไม่สามารถไปหน้าต่อไปได้ และขึ้นแจ้งเตือนห้ามเกิน 60 ตัวอักษร', () => {
    const validUsername = 't';
    const validPassword = 'test123';
    const validTell = '1234567890123456789012345678901234567890123456789012345678901';
    const validEmotion = 'Joy';

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="Tell"]').type(validTell);
    cy.get(`button[name="${validEmotion}"]`).click();

    cy.get('button[name="Go"]').click();

    cy.url().should('not.include', '/home');
    cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    cy.contains('Tell text must not exceed 60 characters.').should('be.visible');
  })

  it('TC2: เมื่อเพื่อนกรอกstatusเข้ามา ต้องแสดงข้อความstatusนั้นที่หน้าhomeของผู้ใช้', () => {
    const validUsernameMe = 'mee';
    const validPasswordMe = '123456';
    const validEmotionMe = 'Joy';
    const validTellMe = 'tellMe';
    const validUsernameFriend = 'friendd';
    const validPasswordFriend = '123456';
    const validEmotionFriend = 'Sadness';
    const validTellFriend = 'tellFriend';

    cy.get('input[name="username"]').type(validUsernameFriend);
    cy.get('input[name="password"]').type(validPasswordFriend);
    cy.get('input[name="Tell"]').type(validTellFriend);
    cy.get(`button[name="${validEmotionFriend}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsernameFriend)}`);
    
    
    cy.visit('http://localhost:3000');
    cy.get('input[name="username"]').type(validUsernameMe);
    cy.get('input[name="password"]').type(validPasswordMe);
    cy.get('input[name="Tell"]').type(validTellMe);
    cy.get(`button[name="${validEmotionMe}"]`).click();
    cy.get('button[name="Go"]').click();
    cy.url().should('include', '/home');
    cy.url().should('include', `username=${encodeURIComponent(validUsernameMe)}`);
    cy.get('button[name="friends"]').click();
    cy.contains('tellFriend').should('be.visible');
    cy.get('button[name="account"]').click();
    cy.get('.bg-borderColor').should('be.visible');
    cy.contains('button', 'Logout').click();
  })

  it('TC3: เมื่อผู้ใช้ไม่กรอกข้อความใดมาเลย จะไม่สามารถไปหน้าต่อไปได้ และขึ้นแจ้งเตือนกรุณากรอกข้อความ', () => {
    const validUsername = 't';
    const validPassword = 'test123';
    const validEmotion = 'Joy';

    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword);
    cy.get(`button[name="${validEmotion}"]`).click();

    cy.get('button[name="Go"]').click();

    cy.url().should('not.include', '/home');
    cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    cy.contains('Please tell something in the Tell field.').should('be.visible');
  })

})
