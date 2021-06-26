import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import {TextInput} from "./index";
import TextInput from "./TextInput";
// import {WEBHOOK_URL} from '../../webhookConfig'


export default class FormDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: "",
    }

    this.inputName = this.inputName.bind(this)
    this.inputEmail = this.inputEmail.bind(this)
    this.inputDescription = this.inputDescription.bind(this)
  }

  inputName = (e) => {
    this.setState({name:e.target.value})
  }
  inputEmail = (e) => {
    this.setState({email:e.target.value})
  }
  inputDescription = (e) => {
    this.setState({description:e.target.value})
  }
  submitForm = () => {
    const name = this.state.name
    const email = this.state.email
    const description = this.state.description

    const payload = {
      text: 'お問い合わせがありました\n' +
            'お名前:' + name + '\n' +
            'Email:' + email + '\n' +
            'お問い合わせ内容:\n' +description
    }

    const url = 'https://hooks.slack.com/services/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'

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(()=> {
      alert('送信が完了しました。追ってご連絡します！')
      this.setState({
        name:'',
        email:'',
        description:''
      })
      return this.props.handleClose()
    })


  }





  render() {
    return (

      <Dialog open={this.props.open} onClose={this.props.handleClose}>
      <DialogTitle>お問い合わせフォーム</DialogTitle>
      <DialogContent>
          <TextInput
              label={"名前(必須)"} multiline={false} rows={1}
              value={this.state.name} type={"text"} onChange={this.inputName}
          />
          <TextInput
              label={"メールアドレス(必須)"} multiline={false} rows={1}
              value={this.state.email} type={"email"} onChange={this.inputEmail}
          />
          <TextInput
              label={"お問い合わせ内容(必須)"} multiline={true} rows={5}
              value={this.state.description} type={"text"} onChange={this.inputDescription}
          />
      </DialogContent>
      <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
              キャンセル
          </Button>
          <Button onClick={this.submitForm} color="primary">
              送信する
          </Button>
      </DialogActions>
  </Dialog>

    )
  }

}






