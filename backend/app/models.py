from .database import db

class Login(db.Model):
    __tablename__ = 'login_info'
    ID       = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(10), nullable=False, unique=True)
    password = db.Column(db.String(10), nullable=False)

class Predictions(db.Model):
    __tablename__ = 'UFC_HISTORY'
    ID          = db.Column(db.Integer, primary_key=True)
    AccountID   = db.Column(db.Integer, nullable=False)
    Fighter1    = db.Column(db.String(10), nullable=False)
    Fighter2    = db.Column(db.String(10), nullable=False)
    Percentage1 = db.Column(db.Float, nullable=False)
    Percentage2 = db.Column(db.Float, nullable=False)
    Winner      = db.Column(db.String(10), nullable=False)

    def to_dict(self):
        return {
            'id':          self.ID,
            'AccountID':   self.AccountID,
            'Fighter1':    self.Fighter1,
            'Fighter2':    self.Fighter2,
            'Percentage1': self.Percentage1,
            'Percentage2': self.Percentage2,
            'Winner':      self.Winner
        }
