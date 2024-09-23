const express = require('express'); // 서버 express 모듈 npm 설치
const app =  express();
const path = require('path'); // 경로지정 (express 내장모듈)
const {v4 : uuid} = require('uuid'); // 고유 아이디 모듈 npm  설치
const methodOverride = require('method-override'); // 다른 patch , delete 요청도 가능하게 하는 모듈


app.use(express.urlencoded({ extended : true}))
app.use(methodOverride('_method')) // 메소드 오버라이드 // ejs에  쿼리문자열 형식으로 대입 
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))



let comments = [
    {   id:uuid(),
        username :'최재욱',
        comment : '앙 기모찌 앙기모띠~'
    },
    {   
        id:uuid() ,
        username :'박진의',
        comment : '형님형님 아야아야~'
    },
    {   
        id:uuid() ,
        username :'조진한',
        comment : '난 재욱이 밖에없어~~~ !! '
    },
    {   
        id:uuid() ,
        username :'홍승혁',
        comment : '안마방 ㄱㄱㄱ ?'
    }
]

app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})
app.get('/comments/new',(req,res)=>{
    res.render('comments/new')
})

app.post('/comments',(req,res)=>{
   const {username , comment} = req.body;
   comments.push({username, comment , id:uuid()})
   res.redirect('/comments');
})

app.get('/comments/:id', (req,res)=>{
    const {id} = req.params
    const comment = comments.find(c => c.id === id);
    res.render('comments/show',{comment})
})

// 편집 폼 제공 라우트
app.get('/comments/:id/edit',(req,res)=>{
    const { id } = req.params
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

// 편집 요청을 받아들이는 patch 라우트
app.patch('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const newComment = req.body.comment
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments')
})

app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    // const foundComment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.get('/tacos',(req,res)=>{
    res.send("GET /tacos response")
})

app.post('/tacos',(req,res)=>{
    const {meat, qty} = req.body;
    res.send(`Ok , here are your ${qty} ${meat} tacos`)
})

app.listen(3000,()=>{
    console.log("Listening to localhost 3000!!!")
})