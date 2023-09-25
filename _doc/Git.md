### Git分支管理

- master:主分支，当前分支上的代码随时可以直接发布，并且只能通过`Pull Request`从其他分支进行合并，而不能直接push修改。当开发告一段落，产生了新的可供发布的代码时，master分支通过`Pull Request`更新了代码，同时，每一次更新必须添加对应版本号的标签TAG。

- develop:开发分支，保存当前最新开发成果的分支，即当一个新功能开发完毕需要先合并到develop分支，这个分支的代码会进行每日的代码持续集成(Daily Build)。所有的开发任务都是从这个分支Checkout新的特性分支进行开发

- feature:特性分支，当开发新的功能时，从develop分支Checkout新的feature分支，这个分支的代码最终要合并回develop分支或者废弃掉(例如预研功能效果不好时)。feature分支最好以功能为单位。

- release:发布分支，从develop分支上派生出来的分支。

当develop分支上的代码已经包含了所有即将发布的所有功能且通过所有测试时，就可以创建release分支用来准备发布。

当准备好正式上架或者发布到生产环境时，release分支合并到master分支和develop分支，并且在master分支上添加标签标记版本号，最后删除release分支。

通过创建release分支，可以让develop分支空闲出来接受其它新的feature分支的代码合并，进入新的功能开发周期，其它feature分支不用为了等待develop分支的发布而无法合并到develop分支中，而且在发布准备过程中，如果发现新的bug或者有修改，可以直接在release分支中修改，而不用担心影响从其它feature分支合并到develop分支的代码。release分支最后必须合并回develop分支，并且发送Pull Request到master分支且添加标签(TAG)。在release分支上只能进行一些发布必要的bug修复或者修改，不要做任何于要发布的功能无关的新的特性的开发，新的特性必须创建新的特性分支。

hotfix:紧急修复分支，唯一从master分支派生的分支，当生产环境中发现了异常或者缺陷的时候，从master分支上指定的TAG版本Checkout hotfix分支进行紧急修复工作，当修复完成之后，必须同时合并到master分支和develop分支。合并完代码之后删除hotfix分支。

### 分支开发流程
1. 首先将代码下载到本地，如果本地已经有代码则直接进入下一步：
```shell
git clone -b http://192.168.0.201:10000/xiaoju/davido-firedetection.git
```
2. 查看所有分支，这时最少会看到3个分支，一个本地分支master分支，和两个远程分支`origin/master`和`origin/develop`分支：
```shell
  git granch -a
```
3. 确认是否有本地`develop`分支，如果没有则从远程`orgin/develop`分支检出到本地`develop`分支：
```shell
  git checkout --track origin/develop
```
然后查看所有分支：
```shell
 git granch -a
```
显示结果如下：
```shell
 * develop
  master
  ...
  //更多本地分支
  
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
  remotes/origin/develop
  ...
  //更多远程分支
```

4. 现在开发新功能，先创建新的远程特性分支，比如开发登录功能，则创建远程特性分支`origin/feature-login`分支，步骤如下
```shell
git checkout develop //切换本地分支到develop分支
git pull //拉取远程Git仓库中的最新的develop分支的代码
git checkout -b feature-login //创建本地特性分支
git push -u origin feature-login //推送本地特性分支到远程Git仓库（即创建远程特性分支），-u为追踪远程分支
```
如果远程代码管理平台支持直接在平台上创建分支，则可以直接在平台上创建远程分支。
 - 最好以功能为单位创建特性分支，而不是以版本号
 - 相对独立相互没有关联的功能最好创建不同的特性分支
 - 因为同一个版本的几个功能在开发过程中可能会因为需求变更而导致只发布部分功能，这时如果所有功能都在相同分支上，则很难将不同功能的代码分离出来
 - 特性分支命名为:feature-{name}，BUG修复的分支则为:hotfix-{name}，发布分支为:release-{name}，这样其他人看到这个分支就知道这个分支是什么作用

5. 如果远程Git仓库中已经存在了`feature-login`特性分支，则直接checkout即可：
```shell
git checkout -b feature-login origin/feature-login
```
6. 现在你就可以在本地`feature-login`分支上开发了，此时所有的提交都是提交在你的本地`feature-login`分支上： 
```shell
git commit -m "提交说明"
```
7. 当你在本地开发工作告一段落，需要把本地代码推送(Push)到远程分支上，而推送之前必须先更新远程分支的修改，因为在你开发过程中可能有其他人有修改推送到了远程`feature-login`分支上：
  ```shell
  git pull --rebase  //拉取远程分支代码，--rebase最好加上
  ```
  执行完上面命令后，如果不存在代码冲突，则直接把本地修改推送到远程仓库：
  ```shell
  git push //推送到远程分支
  ```
  如果有冲突则在本地merge代码解决冲突，然后再推送到远程仓库：
  ```shell
  git commit -m "merge说明"  //将merge的代码先提交到本地分支
  git push //然后推送到远程分支
  ```
8. 到现在，你的所有代码已经提交到远程仓库上，现在需要对新功能进行测试，在测试之前需要先把代码合并到远程origin/develop分支上：
> 注意：当前版本不上线的功能不要合并到远程origin/develop分支上。
```shell
//以下两步的作用是保证你本地的feature-login分支的代码为最新，因为有可能你是和别人合作开发的该功能，如果你刚更新过或者你是一个人在开发则可以省略此操作
git checkout feature-login //切换到本地feature-login分支
git pull --rebase  //拉取最新代码

git checkout develop //切换到本地develop分支
git pull --rebase //拉取最新的远程origin/develop分支代码，因为可能已经有人提交了代码
git merge --no-ff feature-login //从本地feature-login分支合并代码，--no-ff为禁止fast-farward模式
git push //推送到远程分支

//代码已经合并完，可以删除本地特性分支和远程特性分支
git branch -d feature-login //删除本地feature-login特性分支
git push origin --delete feature-login //删除远程origin/feature-login特性分支
```
   - 以上操作，如果没有代码冲突则直接Push代码，有冲突就merge代码后再Push，具体操作可以参考步骤7。
   - 除了直接在develop分支上进行代码的merge和提交，还可以采取`Pull Request`的方式来合并其他特性分支的代码。
   - 删除远程特性分支时一定要跟与你一起开发当前功能并且往同一个远程分支Push代码的同学确认他的代码是否已经全部提交和合并，否则不要随便删除远程特性分支。
9. 现在，你的代码已经合并到远程origin/develop分支上了，并且与其他人的代码进行了merge。
10. 如果你代码已经提交到远程`origin/develop`分支上，但是发现提交的代码有问题需要修改，则按照第4步的方法， 重新创建特性分支，比如登录功能有问题需要修改，则重新创建`origin/feature-login`分支，重复第4步－第8步的操作。

    当然，也有可能你在第8步时没有删除远程 origin/feature-login  分支，所以远程特性分子仍然存在，那是否可以直接在这个分支上开发呢？

    推荐最好不要，而是重新从远程`origin/develop`分支上拉取新的特性分支，因为远程`origin/develop`分支上的代码是merge完之后的最新代码，而之前的远程`origin/feature-login`分支的代码并没有与其他的特性分支进行合并，所以有可能你继续在之前的远程`origin/feature-login`分支开发，然后合并到远程`origin/develop`分支时需要再次merge，而每次代码merge都是有风险的。

    当然，如果你能确认当前没有其他人的特性分支合并到远程`origin/develop`分支上，则可以直接在之前的远程`origin/feature-login`分支上修改问题。