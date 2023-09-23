from datetime import datetime

from sqlalchemy import UniqueConstraint, Column, Integer, DateTime, String

from db.shared import Base


class Device(Base):
    __tablename__ = "device"
    __table_args__ = (UniqueConstraint('family', 'brand', 'model', name='unique_device'),)

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    family = Column(String(50), nullable=True)
    brand = Column(String(50), nullable=True)
    model = Column(String(50), nullable=True)

    def __str__(self):
        return f"<Device: {self.family}\
        {f' |{self.brand}' if self.brand else ''}\
        {f' |{self.model}' if self.model else ''}>"

    def __repr__(self):
        return self.__str__()
