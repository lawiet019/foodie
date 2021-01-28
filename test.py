import smtplib

from email.mime.text import MIMEText
msg = MIMEText('hello, send by Python...', 'plain', 'utf-8')

from_addr = 'foodie_no_reply@outlook.com'
password = 'Test666666'
# 输入SMTP服务器地址:
smtp_server = 'smtp.office365.com'
# 输入收件人地址:
to_addr = '913589432@qq.com'

import smtplib
server = smtplib.SMTP(smtp_server, 587) # SMTP协议默认端口是25
server.set_debuglevel(1)
server.ehlo()  # 向邮箱发送SMTP 'ehlo' 命令
server.starttls()
server.login(from_addr, password)
server.sendmail(from_addr, [to_addr], msg.as_string())
server.quit()
